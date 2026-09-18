# v3 cutover on the VM

Everything below is scripted in `deploy/cutover-v3.sh` (idempotent — re-run to rebuild):

```bash
# from the laptop, after `git push origin v2-final v3 main`
ssh prish-vm 'bash -s' < deploy/cutover-v3.sh
# or without GitHub in the loop: scp a bundle first
git bundle create /tmp/prish-v3.bundle a98a721..main v2-final && scp /tmp/prish-v3.bundle prish-vm:/tmp/
ssh prish-vm 'bash -s -- /tmp/prish-v3.bundle' < deploy/cutover-v3.sh
```

What it does, in order: backs up `.env.production` + pm2 dump → stashes local drift and
fast-forwards `main` → creates `data/leads`, `logs`, the CRM drop folders → writes
`.env.production` from `deploy/env.production.example` if the current one is still the
v2 two-liner → checks the CRM importer and the Hostinger secret file → `npm ci` + build
(prebuild renders bowls + PDFs on the VM) → SMTP login check → `pm2 reload` + health →
installs `deploy/nginx/prish-overseas.conf` (keeps the certbot lines and the `/brochure/`
alias the CRM's outreach mail links to) → public smoke including ERP :8000 and the CRM cron.

Manual equivalents, if you prefer them step by step:

```bash
# folders the app writes to
mkdir -p /var/www/prish-overseas/data/leads
mkdir -p /opt/prish-overseas/leads-to-import/website/{done,failed}

# environment
cp /var/www/prish-overseas/deploy/env.production.example /var/www/prish-overseas/.env.production
chmod 600 /var/www/prish-overseas/.env.production
# fill NEXT_PUBLIC_UMAMI_WEBSITE_ID after Umami is up (deploy/umami/README.md)

# secrets: the CRM already stores the Hostinger password here (0600 opc)
ls -l /opt/prish-overseas/secrets/exports.pw

# CRM importer reachable from the venv?
/opt/prish-overseas/mailcrm/.venv/bin/python /opt/prish-overseas/mailcrm/src/import_leads.py --help

# SMTP login test with the app's env
cd /var/www/prish-overseas && set -a && . ./.env.production && set +a && node scripts/smtp-check.mjs --send

# nginx
sudo cp deploy/nginx/prish-overseas.conf /etc/nginx/conf.d/prish-overseas.conf
sudo certbot --nginx -d www.prishoverseas.com -d prishoverseas.com   # if the cert lines need re-adding
sudo nginx -t && sudo systemctl reload nginx

# build + reload (the GitHub workflow does this on every push to main)
npm ci && NODE_OPTIONS=--max-old-space-size=3072 npm run build && pm2 reload prish-overseas --update-env
curl -fsS http://127.0.0.1:3000/api/health
```

Rollback: `git checkout v2-final && npm ci && npm run build && pm2 reload prish-overseas`.
