# Umami on the Oracle VM (cookie-free analytics)

Runs as a second pm2 app on :3001 with a local Postgres, proxied at `https://www.prishoverseas.com/umami/`.
Nothing here touches the ERP (:8000) or the mail-CRM.

```bash
# 1. Postgres (Oracle Linux 9 appstream)
sudo dnf install -y postgresql-server
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql
sudo -u postgres psql -c "CREATE USER umami WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE umami OWNER umami;"
# allow local password auth if pg_hba.conf is 'ident' for local connections:
#   host all umami 127.0.0.1/32 scram-sha-256   → then: sudo systemctl reload postgresql

# 2. Umami (owner opc)
cd /opt && sudo mkdir -p umami && sudo chown opc:opc umami
git clone https://github.com/umami-software/umami.git /opt/umami && cd /opt/umami
cat > .env <<'ENV'
DATABASE_URL=postgresql://umami:CHANGE_ME@127.0.0.1:5432/umami
BASE_PATH=/umami
PORT=3001
APP_SECRET=REPLACE_WITH_openssl_rand_-hex_32
DISABLE_TELEMETRY=1
ENV
npm ci && npm run build          # Prisma has linux-arm64 engines; ~5 min on the VM
pm2 start npm --name umami -- start
pm2 save

# 3. nginx: the /umami/ location is already in deploy/nginx/prish-overseas.conf
sudo nginx -t && sudo systemctl reload nginx

# 4. First login: https://www.prishoverseas.com/umami/  (admin / umami) → change the password,
#    add website "www.prishoverseas.com", copy its Website ID into
#    /var/www/prish-overseas/.env.production as NEXT_PUBLIC_UMAMI_WEBSITE_ID, then
#    pm2 restart prish-overseas --update-env
```

Check `free -h` first — Umami + Postgres want ~500 MB of headroom.
Events the site sends: `whatsapp_click` (placement, product), `kit_add`, `kit_submit`, `quick_inquiry_submit`,
`spec_sheet_download`, `catalogue_download`, `burst`, `region_set`.
