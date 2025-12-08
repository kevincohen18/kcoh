# EmailJS Template Configuration Guide

## ⚠️ IMPORTANT: Template Setup for `inquiries@kcoh.ca`

To ensure emails are sent to `inquiries@kcoh.ca`, you MUST configure your EmailJS template correctly.

## Contact Form Template (`template_zz1sxwj`)

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/admin/template
2. Find and click on template `template_zz1sxwj`

### Step 2: Configure "To Email" Field
In the template editor, find the **"To Email"** field and set it to:

**Option A (Recommended - Static Email):**
```
inquiries@kcoh.ca
```

**Option B (Using Template Variable):**
```
{{to_email}}
```

⚠️ **IMPORTANT**: If you use Option B, make sure `to_email` is being sent in the template parameters (it is in the code).

### Step 3: Configure Template Variables
Make sure your template content uses these variables:

**Subject Line:**
```
New Contact Form Submission from {{from_name}}
```

**Email Content:**
```
From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the contact form on kcoh.ca
```

### Step 4: Verify Service Email
1. Go to: https://dashboard.emailjs.com/admin/service
2. Find service `service_o6blrnk`
3. Verify the service email is set correctly (this is the email account that will SEND the email)
4. Make sure the service is **Active**

## Newsletter Template (`template_4v48c53`)

### Configure "To Email" Field:
Set to: `inquiries@kcoh.ca` (or use `{{to_email}}` if you prefer)

### Template Content:
**Subject:**
```
New Newsletter Subscription
```

**Email Content:**
```
New newsletter subscription:

Email: {{email}}

---
This email was sent from the newsletter form on kcoh.ca
```

## Current Code Configuration

The code now sends these parameters:
- `from_name` - Sender's name
- `from_email` - Sender's email
- `name` - Also included for compatibility
- `email` - Also included for compatibility
- `subject` - Email subject
- `message` - Email message
- `to_email` - Recipient email (`inquiries@kcoh.ca`)

## Quick Checklist

✅ Template "To Email" field set to `inquiries@kcoh.ca` or `{{to_email}}`
✅ Template uses `{{from_name}}` and `{{from_email}}` variables
✅ Service is Active in EmailJS dashboard
✅ Service email account is properly configured
✅ Template ID matches: `template_zz1sxwj`

## Testing

After updating your template:
1. Submit the contact form on your website
2. Check EmailJS logs: https://dashboard.emailjs.com/admin/logs
3. Verify the email was sent to `inquiries@kcoh.ca`
4. Check your inbox at `inquiries@kcoh.ca`

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify "To Email" field in template is correct
- Check EmailJS logs for errors
- Verify service is active

**Wrong recipient?**
- Double-check "To Email" field in template
- Make sure it's `inquiries@kcoh.ca` (not `inquiry@kcoh.ca` or similar)
- If using `{{to_email}}`, verify it's being sent correctly

