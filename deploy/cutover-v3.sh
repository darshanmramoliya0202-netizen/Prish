#!/usr/bin/env bash
# v3 cutover on the Oracle VM. Run as opc:
#   ssh prish-vm 'bash -s' < deploy/cutover-v3.sh            # after `git push origin main`
#   ssh prish-vm 'bash -s -- /tmp/prish-v3.bundle' < deploy/cutover-v3.sh   # from a git bundle
# Idempotent: re-running just rebuilds and reloads. Rollback at the bottom.
set -euo pipefail

APP=/var/www/prish-overseas
BUNDLE="${1:-}"
step() { printf '\n\033[1;32m▶ %s\033[0m\n' "$*"; }

cd "$APP"

step "backups (env + pm2 dump + current commit)"
mkdir -p /opt/prish-overseas/backups
[ -f .env.production ] && cp -n .env.production "/opt/prish-overseas/backups/env.production.$(date +%Y%m%d-%H%M%S)" || true
git rev-parse --short HEAD > /opt/prish-overseas/backups/last-commit
pm2 save >/dev/null 2>&1 || true

step "code: fetch and fast-forward main"
if [ -n "$(git status --porcelain)" ]; then
  git stash push -u -m "local drift before v3 cutover $(date -Is)" >/dev/null && echo "  local changes stashed (git stash list)"
fi
if [ -n "$BUNDLE" ]; then
  git bundle verify "$BUNDLE" >/dev/null
  git fetch "$BUNDLE" main:refs/remotes/bundle/main 'refs/tags/*:refs/tags/*'
  git checkout -q main
  git merge --ff-only bundle/main
else
  git fetch --all --tags
  git checkout -q main
  git pull --ff-only origin main
fi
git log --oneline -1

step "folders the app writes to"
mkdir -p "$APP/data/leads" "$APP/logs" /opt/prish-overseas/leads-to-import/website/done /opt/prish-overseas/leads-to-import/website/failed

step "environment"
if ! grep -q '^SMTP_HOST=' .env.production 2>/dev/null; then
  cp deploy/env.production.example .env.production
  echo "  .env.production written from deploy/env.production.example"
else
  echo "  .env.production already v3-style — kept"
fi
chmod 600 .env.production
test -r /opt/prish-overseas/secrets/exports.pw || { echo "!! /opt/prish-overseas/secrets/exports.pw missing"; exit 1; }
/opt/prish-overseas/mailcrm/.venv/bin/python /opt/prish-overseas/mailcrm/src/import_leads.py --help >/dev/null && echo "  CRM importer reachable"

step "install + build (aarch64, ~5 min)"
npm ci --no-audit --no-fund
NODE_OPTIONS=--max-old-space-size=3072 npm run build

step "SMTP login check (no mail sent)"
set -a; . ./.env.production; set +a
node scripts/smtp-check.mjs || echo "  !! SMTP check failed — leads are still saved to data/leads and retried; fix env and re-run"

step "reload app"
pm2 reload prish-overseas --update-env
for i in 1 2 3 4 5 6 7 8 9 10; do sleep 2; curl -fsS http://127.0.0.1:3000/api/health && break || echo "  waiting for :3000 ($i)"; done
echo

step "nginx"
if ! diff -q deploy/nginx/prish-overseas.conf /etc/nginx/conf.d/prish-overseas.conf >/dev/null 2>&1; then
  sudo cp /etc/nginx/conf.d/prish-overseas.conf "/opt/prish-overseas/backups/nginx.prish-overseas.conf.$(date +%Y%m%d-%H%M%S)"
  sudo cp deploy/nginx/prish-overseas.conf /etc/nginx/conf.d/prish-overseas.conf
  sudo nginx -t && sudo systemctl reload nginx && echo "  nginx reloaded"
else
  echo "  nginx config unchanged"
fi

step "public smoke"
curl -sS -o /dev/null -w "  https://www.prishoverseas.com → %{http_code} (%{time_total}s)\n" https://www.prishoverseas.com/
curl -sS -o /dev/null -w "  /products/raw-whole-spices/cumin-seeds → %{http_code}\n" https://www.prishoverseas.com/products/raw-whole-spices/cumin-seeds
curl -sS -o /dev/null -w "  /downloads/prish-overseas-catalogue.pdf → %{http_code}\n" https://www.prishoverseas.com/downloads/prish-overseas-catalogue.pdf
curl -sS -o /dev/null -w "  /sitemap.xml → %{http_code}\n" https://www.prishoverseas.com/sitemap.xml
curl -sS -o /dev/null -w "  /brochure/ (CRM outreach files) → %{http_code}\n" https://www.prishoverseas.com/brochure/
curl -sS -o /dev/null -w "  ERP by IP :8000 → %{http_code}\n" http://127.0.0.1:8000/ || true
pm2 ls | grep -E "prish-overseas|umami" || true
crontab -l 2>/dev/null | grep -c prish-overseas | sed 's/^/  CRM cron lines intact: /' || true

cat <<'EOF'

Done. Rollback (≤ 5 min):
  cd /var/www/prish-overseas && git checkout v2-final && cp /opt/prish-overseas/backups/env.production.* .env.production \
    && npm ci && npm run build && pm2 reload prish-overseas --update-env
EOF
