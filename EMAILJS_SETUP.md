# EmailJS Setup Guide

## Quick Setup Steps

### 1. Get Your Public Key ✅ (Already Configured)
- Your Public Key: `GgkF4EXvRp9ePaCIE` (already added to script.js)
- ⚠️ **IMPORTANT**: Your Private Key (`frP4Vv1nTBFTX3-34w7SE`) should NEVER be added to client-side code!
- Private keys are only for server-side use and should be kept secret

### 2. Get Your Service ID
1. Go to https://dashboard.emailjs.com/admin/service
2. Find your email service (or create one if you haven't)
3. Copy the **Service ID** (usually a short string like `service_abc123`)

### 3. Get Your Template IDs
1. Go to https://dashboard.emailjs.com/admin/template
2. Create two templates:
   - **Contact Form Template**: For the main contact form
   - **Newsletter Template**: For newsletter subscriptions

#### Contact Form Template Setup:
- **Template Name**: Contact Form
- **Subject**: `New Contact Form Submission from {{from_name}}`
- **Content**:
```
From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the contact form on kcoh.ca
```

#### Newsletter Template Setup:
- **Template Name**: Newsletter Subscription
- **Subject**: `New Newsletter Subscription`
- **Content**:
```
New newsletter subscription:

Email: {{email}}

---
This email was sent from the newsletter form on kcoh.ca
```

3. Copy the **Template ID** for each template (usually starts with `template_`)

### 4. Update script.js ✅ (Public Key Already Added)

Your public key is already configured! You just need to add:
- Service ID
- Contact Template ID  
- Newsletter Template ID

Open `script.js` and update these remaining values:

```javascript
const EMAILJS_PUBLIC_KEY = 'GgkF4EXvRp9ePaCIE'; // ✅ Already configured
const EMAILJS_SERVICE_ID = 'your_service_id_here'; // ⬅️ Add this
const EMAILJS_CONTACT_TEMPLATE = 'your_contact_template_id_here'; // ⬅️ Add this
const EMAILJS_NEWSLETTER_TEMPLATE = 'your_newsletter_template_id_here'; // ⬅️ Add this
```

### 5. Test Your Setup

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox (the email address you configured in your EmailJS service)

## Troubleshooting

### Form not sending emails?
- Check browser console for errors (F12 → Console)
- Verify all IDs are correct (no typos)
- Make sure EmailJS SDK is loaded (check Network tab)
- Verify your email service is active in EmailJS dashboard

### Getting "Invalid public key" error?
- Make sure you're using the **Public Key**, not the Private Key
- Public keys start with `user_`
- Copy the entire key (it's long)

### Emails going to spam?
- Configure SPF/DKIM records for your domain (if using custom domain)
- Or use EmailJS's default sending domain (may go to spam initially)

## Security Notes

⚠️ **CRITICAL SECURITY WARNING**: 
- ✅ **Public Key** (`GgkF4EXvRp9ePaCIE`) - Safe to expose in client-side code (already added)
- ❌ **Private Key** (`frP4Vv1nTBFTX3-34w7SE`) - **NEVER** add this to client-side code!
  - Private keys are ONLY for server-side use
  - Never commit private keys to version control
  - Keep private keys in environment variables or secure config files
  - If you accidentally committed it, regenerate it in EmailJS dashboard immediately

✅ **What's Safe**:
- Public key can be seen in your website's source code (this is normal and safe)
- Public key is designed to be exposed in client-side JavaScript

❌ **What's NOT Safe**:
- Private key in any client-side code
- Private key in version control (Git)
- Private key in public repositories

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

