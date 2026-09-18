# Ops — prishoverseas.com

## Where it runs
- **VM:** Oracle Cloud "Project Q", Oracle Linux 9, **aarch64**, IP `80.225.227.233`, user `opc`.
- **DNS:** Hostinger. `A @ → 80.225.227.233`, `CNAME www → prishoverseas.com`. Non-www 301s to www (nginx).
- **Web app:** `/var/www/prish-overseas`, pm2 app `prish-overseas` (`npm start`, port 3000, `ecosystem.config.js`).
- **Nginx:** `/etc/nginx/conf.d/prish-overseas.conf` (source: `deploy/nginx/prish-overseas.conf`). Let's Encrypt via certbot, auto-renew cron.
- **Co-hosted — do not touch:** Django ERP (Gunicorn :8000, `/home/opc/ERP/`, `/etc/nginx/conf.d/erp.conf`, served at `https://80.225.227.233`) and the mail-CRM (`/opt/prish-overseas/mailcrm`, cron `30 4 * * *` UTC → `src/morning.py`).
- **Analytics:** Umami (pm2 app `umami`, :3001, Postgres local) proxied at `/umami/`. See `deploy/umami/README.md`.

## Deploy
Push to `main` → `.github/workflows/deploy.yml` → x64 check job → SSH to VM → `git pull`, `npm ci`, `npm run build`, `pm2 reload`, health check. Secret: `ORACLE_SSH_KEY`.

## Environment on the VM
`/var/www/prish-overseas/.env.production` (chmod 600, owner opc) — copy from `deploy/env.production.example`. SMTP password is read from the CRM's secret file via `SMTP_PASS_FILE=/opt/prish-overseas/secrets/exports.pw`. After edits: `pm2 restart prish-overseas --update-env`.

## Leads
1. Every submission is persisted first to `LEADS_DIR/<submissionId>.json`.
2. Email to `exports@prishoverseas.com` (cc Gmail) + confirmation to the buyer.
3. CSV dropped in `/opt/prish-overseas/leads-to-import/website/` and imported with the CRM's own `import_leads.py --source Website`. Done files move to `done/`, failures to `failed/` after 8 attempts. A sweeper (`instrumentation.ts`) retries every 10 min.
Health: `curl http://127.0.0.1:3000/api/health`.

## Rollback
```bash
cd /var/www/prish-overseas && git checkout v2-final && npm ci && npm run build && pm2 reload prish-overseas
```
Nginx, ERP, CRM and Umami are unaffected by a web rollback.

## Useful
- `pm2 status` · `pm2 logs prish-overseas --lines 100`
- `sudo nginx -t && sudo systemctl reload nginx`
- `crontab -l | grep prish-overseas` (CRM cron must stay)
