#!/bin/bash

# Oracle Cloud Setup Script for Prish Overseas Website
# Run this script on the Oracle Cloud VM after SSH connection is established

echo "Starting Oracle Cloud setup for Prish Overseas..."

# Phase 1: System Update
echo "Phase 1: Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Phase 2: Install Node.js 20
echo "Phase 2: Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Phase 3: Install PM2
echo "Phase 3: Installing PM2..."
sudo npm install -g pm2

# Phase 4: Install Nginx
echo "Phase 4: Installing Nginx..."
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Phase 5: Create deployment directory
echo "Phase 5: Creating deployment directory..."
sudo mkdir -p /var/www/prish-overseas
sudo chown ubuntu:ubuntu /var/www/prish-overseas
cd /var/www/prish-overseas
mkdir -p logs uploads

# Phase 6: Clone and setup application
echo "Phase 6: Cloning repository and setting up application..."
git clone https://github.com/darshanmramoliya0202-netizen/Prish.git .
npm install
npm run build

# Phase 7: Setup environment variables
echo "Phase 7: Setting up environment variables..."
cat > .env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.prishoverseas.com
EOF

# Phase 8: Setup PM2
echo "Phase 8: Configuring PM2..."
cp ecosystem.config.js .
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Phase 9: Setup Nginx configuration
echo "Phase 9: Configuring Nginx..."
sudo cp nginx-prish-overseas.conf /etc/nginx/sites-available/prish-overseas
sudo ln -s /etc/nginx/sites-available/prish-overseas /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Phase 10: Install SSL Certificate
echo "Phase 10: Installing SSL certificate..."
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d www.prishoverseas.com -d prishoverseas.com --email prishoverseas9@gmail.com --agree-tos --non-interactive

# Setup SSL auto-renewal
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo "Oracle Cloud setup completed!"
echo "Next steps:"
echo "1. Update DNS A record at Hostinger to point to 80.225.227.233"
echo "2. Test the website at https://www.prishoverseas.com"
echo "3. Monitor application with: pm2 status && pm2 logs prish-overseas"
