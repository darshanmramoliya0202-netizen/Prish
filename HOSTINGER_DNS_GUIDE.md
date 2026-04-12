# 📋 Hostinger DNS Update Guide - Step by Step

This guide will walk you through updating the DNS records for `prishoverseas.com` at Hostinger to point to your Oracle Cloud server.

## 🎯 **Objective**
Point your domain `www.prishoverseas.com` to the Oracle Cloud server IP: `80.225.227.233`

---

## 🔐 **Step 1: Log in to Hostinger**

1. Open your web browser
2. Go to: **https://www.hostinger.com**
3. Click **"Login"** in the top right corner
4. Enter your Hostinger credentials:
   - **Email**: Your Hostinger account email
   - **Password**: Your Hostinger password
5. Click **"Log In"**

---

## 🏠 **Step 2: Navigate to Domain Management**

1. After logging in, you'll see the Hostinger dashboard
2. Look for **"Domains"** in the left sidebar menu
3. Click on **"Domains"** to see your domain list
4. Find **`prishoverseas.com`** in your domain list
5. Click on the domain name or the **"Manage"** button next to it

---

## 🌐 **Step 3: Access DNS Management**

1. In the domain management page, look for **"DNS Management"** or **"DNS Settings"**
2. Click on **"DNS Management"** 
3. You'll see the current DNS records for `prishoverseas.com`

---

## ✏️ **Step 4: Update A Record (Root Domain)**

### **Find Existing A Record**
1. Look for an existing **A record** with:
   - **Type**: A
   - **Name**: `@` (or sometimes blank or "prishoverseas.com")
   - **Current Value**: Some other IP address (probably Netlify's)

### **Edit the A Record**
1. Click the **"Edit"** (pencil icon) or **"Modify"** button next to the A record
2. Update the following fields:
   - **Type**: A (keep this unchanged)
   - **Name**: `@` (keep this unchanged)
   - **Value/Points to**: `80.225.227.233` ⭐ **IMPORTANT**
   - **TTL**: `300` (or 5 minutes) ⭐ **IMPORTANT**

3. Click **"Save Changes"** or **"Update"**

### **If No A Record Exists**
1. Click **"Add New Record"** or **"Add Record"**
2. Select **Type**: `A`
3. **Name**: `@`
4. **Value**: `80.225.227.233`
5. **TTL**: `300`
6. Click **"Save"**

---

## 🔗 **Step 5: Update CNAME Record (WWW Subdomain)**

### **Find Existing CNAME Record**
1. Look for a **CNAME record** with:
   - **Type**: CNAME
   - **Name**: `www`
   - **Current Value**: Some other domain

### **Edit the CNAME Record**
1. Click the **"Edit"** button next to the CNAME record
2. Update the fields:
   - **Type**: CNAME (keep unchanged)
   - **Name**: `www` (keep unchanged)
   - **Value**: `prishoverseas.com` ⭐ **IMPORTANT**
   - **TTL**: `300` (or 5 minutes)

3. Click **"Save Changes"**

### **If No CNAME Record Exists**
1. Click **"Add New Record"**
2. Select **Type**: `CNAME`
3. **Name**: `www`
4. **Value**: `prishoverseas.com`
5. **TTL**: `300`
6. Click **"Save"**

---

## ✅ **Step 6: Verify and Save**

1. Review your changes:
   - **A Record**: `@` → `80.225.227.233`
   - **CNAME Record**: `www` → `prishoverseas.com`
   - Both TTLs set to `300`

2. Click **"Save Changes"** or **"Apply Changes"**
3. Hostinger may show a confirmation message: **"DNS records updated successfully"**

---

## ⏱️ **Step 7: Wait for DNS Propagation**

### **Propagation Time**
- **Expected**: 5-30 minutes (because we set TTL to 300)
- **Maximum**: 24 hours (rare, but possible)

### **How to Check Propagation**
You can check if DNS has propagated using these tools:

#### **Option 1: Online DNS Checker**
1. Go to: **https://dnschecker.org**
2. Enter: `www.prishoverseas.com`
3. Select **A record**
4. Click **"Search"**
5. Look for green checkmarks showing `80.225.227.233`

#### **Option 2: Command Line (Windows)**
```cmd
nslookup www.prishoverseas.com
```
You should see: `80.225.227.233`

#### **Option 3: Command Line (Mac/Linux)**
```bash
dig www.prishoverseas.com
```
Look for the A record showing `80.225.227.233`

---

## 🔒 **Step 8: Configure SSL Certificate (After DNS Propagation)**

Once DNS propagation is complete, connect to your Oracle Cloud server:

```bash
ssh -i "D:\Darshan\ssh-key-2026-03-02 (1).key" opc@80.225.227.233
```

Then run the SSL certificate setup:

```bash
sudo /usr/local/bin/certbot --nginx -d www.prishoverseas.com -d prishoverseas.com --email prishoverseas9@gmail.com --agree-tos --non-interactive
```

---

## 🧪 **Step 9: Final Verification**

### **Test the Website**
1. Open your browser
2. Go to: **https://www.prishoverseas.com**
3. You should see the Prish Overseas website
4. Check for the 🔒 SSL certificate (green padlock)

### **Test Both Websites**
- **ERP**: https://80.225.227.233 (should still work)
- **Prish**: https://www.prishoverseas.com (should now work)

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **DNS Changes Not Applied**
- **Wait longer**: DNS can take up to 24 hours
- **Clear browser cache**: Ctrl+F5 or Cmd+Shift+R
- **Try different browser**: Sometimes browser DNS is cached
- **Check from different network**: Mobile data vs WiFi

#### **Website Not Loading**
- **Check DNS propagation**: Use dnschecker.org
- **Verify server status**: SSH to Oracle Cloud and check PM2 status
- **Check Nginx logs**: `sudo tail -f /var/log/nginx/error.log`

#### **SSL Certificate Issues**
- **Wait for DNS**: SSL won't work until DNS propagates
- **Check Certbot logs**: `sudo cat /var/log/letsencrypt/letsencrypt.log`

---

## 📞 **Need Help?**

If you encounter any issues:

1. **Check this guide first** - most issues are DNS propagation related
2. **Wait 30 minutes** - DNS changes take time
3. **Contact Hostinger support** - if you can't find DNS settings
4. **Check Oracle Cloud server** - if DNS is working but website isn't

---

## 🎉 **Success Checklist**

- [ ] Logged in to Hostinger successfully
- [ ] Found DNS Management for prishoverseas.com
- [ ] Updated A record: `@` → `80.225.227.233`
- [ ] Updated CNAME record: `www` → `prishoverseas.com`
- [ ] Set both TTLs to 300
- [ ] Saved changes successfully
- [ ] Waited for DNS propagation (5-30 minutes)
- [ ] Verified DNS propagation with dnschecker.org
- [ ] Configured SSL certificate on Oracle Cloud
- [ ] Tested both websites successfully

**Once all these steps are complete, your migration will be 100% successful!** 🚀

---

## 📋 **Quick Reference**

| Record Type | Name   | Value              | TTL  |
|-------------|--------|--------------------|------|
| A           | @      | 80.225.227.233     | 300  |
| CNAME       | www    | prishoverseas.com  | 300  |

**Save this reference for future updates!**
