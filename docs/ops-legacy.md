# 📋 Oracle Cloud Deployment Documentation

## 🏢 Server Information

### **Oracle Cloud VM Details**
- **IP Address**: `80.225.227.233`
- **Instance Name**: Project Q
- **OS**: Oracle Linux 9.7
- **Architecture**: aarch64 (ARM64)
- **SSH User**: `opc`

### **SSH Connection**
```bash
ssh -i "D:\Darshan\ssh-key-2026-03-02 (1).key" opc@80.225.227.233
```

- **SSH Key Path**: `D:\Darshan\ssh-key-2026-03-02 (1).key`
- **SSH User**: `opc`
- **Port**: 22 (default)

---

## 🌐 Website Configuration

### **Dual Website Hosting**

#### **1. ERP Website** (Existing)
- **Access**: `https://80.225.227.233`
- **Technology**: Python Django + Gunicorn
- **Port**: 8000 (internal)
- **SSL**: Existing certificate maintained
- **Process**: 3 Gunicorn workers
- **Config**: `/etc/nginx/conf.d/erp.conf`

#### **2. Prish Overseas Website** (New)
- **Access**: `https://www.prishoverseas.com`
- **Technology**: Next.js 16.1.6 + React 19
- **Port**: 3000 (internal)
- **SSL**: Let's Encrypt certificate
- **Process**: PM2 process manager
- **Config**: `/etc/nginx/conf.d/prish-overseas.conf`

---

## 📁 Directory Structure

### **Application Directories**
```
/var/www/prish-overseas/          # Prish Overseas application
├── logs/                         # Application logs
├── uploads/                      # File uploads
├── .next/                        # Next.js build output
├── public/                       # Static files
├── components/                   # React components
├── app/                          # Next.js app router
├── ecosystem.config.js           # PM2 configuration
└── package.json                  # Dependencies

/home/opc/ERP/                    # ERP application
├── staticfiles/                  # Django static files
├── media/                        # Django media files
├── venv/                         # Python virtual environment
└── config/                       # Django configuration
```

### **Configuration Files**
```
/etc/nginx/conf.d/
├── erp.conf                      # ERP Nginx configuration
├── prish-overseas.conf          # Prish Nginx configuration
└── erp.conf.backup              # ERP backup
└── prish-overseas.conf.backup  # Prish backup

/etc/ssl/certs/                   # SSL certificates
└── erp.crt                      # ERP SSL certificate

/etc/ssl/private/                 # SSL private keys
└── erp.key                      # ERP SSL private key
```

---

## 🔧 System Configuration

### **Installed Software**
- **Node.js**: v20.20.2
- **npm**: v10.8.2
- **PM2**: v6.0.14
- **Nginx**: v1.20.1
- **Python**: v3.9 (for ERP)
- **Certbot**: v4.2.0 (via pip)
- **Git**: Latest version

### **Process Management**
```bash
# Check Prish Overseas status
pm2 status
pm2 logs prish-overseas
pm2 restart prish-overseas

# Check ERP status
ps aux | grep gunicorn
systemctl status nginx
```

### **Service Status**
```bash
# Nginx
sudo systemctl status nginx
sudo systemctl reload nginx
sudo nginx -t

# PM2 (auto-start configured)
pm2 startup
pm2 save
```

---

## 🔐 SSL Certificates

### **ERP Certificate**
- **Type**: Existing certificate (maintained)
- **Path**: `/etc/ssl/certs/erp.crt`
- **Key**: `/etc/ssl/private/erp.key`
- **Auto-renewal**: Unknown (manual check required)

### **Prish Overseas Certificate**
- **Type**: Let's Encrypt
- **Domain**: www.prishoverseas.com
- **Auto-renewal**: Configured via cron
- **Setup Command**:
```bash
sudo /usr/local/bin/certbot --nginx -d www.prishoverseas.com -d prishoverseas.com --email prishoverseas9@gmail.com --agree-tos --non-interactive
```

### **SSL Renewal**
```bash
# Check renewal status
sudo certbot certificates

# Manual renewal
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

---

## 🚀 Deployment Process

### **Manual Deployment**
```bash
ssh -i "D:\Darshan\ssh-key-2026-03-02 (1).key" opc@80.225.227.233
cd /var/www/prish-overseas
git pull origin main
npm ci
npm run build
pm2 restart prish-overseas
```

### **GitHub Actions CI/CD**
- **Workflow**: `.github/workflows/deploy-oracle.yml`
- **Trigger**: Push to main branch
- **SSH Key**: Stored in GitHub secrets as `ORACLE_SSH_KEY`

### **Environment Variables**
```bash
# Location: /var/www/prish-overseas/.env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.prishoverseas.com
```

---

## 📊 Monitoring and Logs

### **Application Logs**
```bash
# Prish Overseas logs
pm2 logs prish-overseas
tail -f /var/www/prish-overseas/logs/pm2-combined.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
journalctl -u nginx
```

### **Performance Monitoring**
```bash
# PM2 monitoring
pm2 monit

# System resources
top
htop
df -h
free -h
```

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Website Not Loading**
```bash
# Check DNS resolution
nslookup www.prishoverseas.com
dig www.prishoverseas.com

# Check server status
pm2 status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t
```

#### **SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Check certificate details
openssl x509 -in /etc/letsencrypt/live/www.prishoverseas.com/fullchain.pem -text -noout

# Renew certificate
sudo certbot renew
```

#### **Application Not Responding**
```bash
# Restart Prish Overseas
pm2 restart prish-overseas

# Check logs for errors
pm2 logs prish-overseas --lines 50

# Check if port is listening
netstat -tlnp | grep :3000
```

---

## 📋 Maintenance Tasks

### **Regular Maintenance**
```bash
# Update system packages
sudo dnf update -y

# Update npm packages
cd /var/www/prish-overseas
npm update

# Check SSL renewal
sudo certbot renew --dry-run

# Clean up logs
pm2 flush
```

### **Backup Procedures**
```bash
# Backup Nginx configurations
sudo cp /etc/nginx/conf.d/*.conf /backup/

# Backup application
cd /var/www/
tar -czf prish-overseas-backup-$(date +%Y%m%d).tar.gz prish-overseas/

# Backup PM2 configuration
pm2 save
cp /home/opc/.pm2/dump.pm2 /backup/
```

---

## 🌐 Domain Configuration

### **DNS Records (Hostinger)**
| Record Type | Name   | Value              | TTL  |
|-------------|--------|--------------------|------|
| A           | @      | 80.225.227.233     | 300  |
| CNAME       | www    | prishoverseas.com  | 300  |

### **Domain Access**
- **ERP**: `https://80.225.227.233`
- **Prish**: `https://www.prishoverseas.com`

---

## 📞 Important Contacts and References

### **Domain Management**
- **Registrar**: Hostinger
- **Domain**: prishoverseas.com
- **DNS Management**: Hostinger control panel

### **Server Management**
- **Oracle Cloud Console**: https://console.oracle-cloud.com
- **Instance**: Project Q
- **SSH Access**: Via provided key file

### **Development Repository**
- **GitHub**: https://github.com/darshanmramoliya0202-netizen/Prish
- **Main Branch**: main
- **Deployment**: Automatic via GitHub Actions

---

## 📅 Deployment Timeline

- **2026-04-12**: Initial Oracle Cloud setup completed
- **2026-04-12**: Dual website co-hosting configured
- **2026-04-12**: DNS migration from Netlify to Oracle Cloud
- **2026-04-12**: SSL certificate configured for Prish Overseas

---

## 🎯 Quick Reference Commands

### **Essential Commands**
```bash
# SSH to server
ssh -i "D:\Darshan\ssh-key-2026-03-02 (1).key" opc@80.225.227.233

# Check both websites status
pm2 status && sudo systemctl status nginx

# Deploy updates
cd /var/www/prish-overseas && git pull && npm ci && npm run build && pm2 restart prish-overseas

# Test both sites
curl -k -I https://80.225.227.233 && curl -I https://www.prishoverseas.com
```

### **Emergency Commands**
```bash
# Restart all services
sudo systemctl reload nginx && pm2 restart all

# Check system health
df -h && free -h && uptime

# Emergency rollback (if needed)
sudo cp /etc/nginx/conf.d/*.conf.backup /etc/nginx/conf.d/ && sudo systemctl reload nginx
```

---

## 📝 Notes

- **Zero downtime migration**: Both websites coexist without conflicts
- **Independent scaling**: Each website can be managed separately
- **Security**: Both sites have SSL certificates
- **Performance**: Optimized Nginx configuration with caching
- **Monitoring**: PM2 and Nginx logs available
- **Backup strategy**: Regular backups recommended

---

**Last Updated**: 2026-04-12
**Migration Status**: ✅ COMPLETE
**Both Websites**: ✅ LIVE and OPERATIONAL
