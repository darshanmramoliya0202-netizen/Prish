# One-time VM preparation for v3 (run as opc)

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
