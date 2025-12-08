# EmailJS Troubleshooting Guide

## Current Configuration
- **Public Key**: `Z_iIIF96wVdVQLv_E`
- **Service ID**: `service_o6blrnk`
- **Contact Template**: `template_zz1sxwj`
- **Newsletter Template**: `template_4v48c53`

## Common Issues & Solutions

### 1. Check Browser Console
Open your browser's developer console (F12) and look for:
- ✅ "EmailJS initialized successfully ✓" - EmailJS is loaded
- ✅ "Sending email via EmailJS..." - Form submission is working
- ❌ Any error messages - These will tell you what's wrong

### 2. Verify EmailJS Dashboard Settings

#### Check Your Service:
1. Go to https://dashboard.emailjs.com/admin/service
2. Find service `service_o6blrnk`
3. Verify:
   - Service is **Active** (not paused)
   - Email address is correct (`inquiries@kcoh.ca`)
   - Service type is correct (Gmail, SMTP, etc.)

#### Check Your Templates:

**Contact Form Template (`template_zz1sxwj`):**
- Go to https://dashboard.emailjs.com/admin/template
- Open template `template_zz1sxwj`
- Verify template uses these variables:
  - `{{name}}` (not `{{from_name}}`)
  - `{{email}}` (not `{{from_email}}`)
  - `{{subject}}`
  - `{{message}}`
  - `{{to_email}}` (optional)

**Newsletter Template (`template_4v48c53`):**
- Verify it uses:
  - `{{email}}`
  - `{{to_email}}` (optional)

### 3. Template Variable Mismatch
The code sends:
```javascript
{
    name: formData.name,        // ← Make sure template uses {{name}}
    email: formData.email,      // ← Make sure template uses {{email}}
    subject: formData.subject,  // ← Make sure template uses {{subject}}
    message: formData.message, // ← Make sure template uses {{message}}
    to_email: 'inquiries@kcoh.ca'
}
```

**If your template uses different variable names**, you have two options:

**Option A:** Update your EmailJS templates to use `{{name}}`, `{{email}}`, etc.

**Option B:** Update the code to match your template variables.

### 4. Check EmailJS Quota
- Free tier: 200 emails/month
- Check usage at https://dashboard.emailjs.com/admin/billing
- If quota exceeded, upgrade or wait for reset

### 5. Check Spam Folder
- Emails might be going to spam
- Check spam/junk folder
- Add EmailJS sender to contacts

### 6. Test EmailJS Directly
1. Go to https://dashboard.emailjs.com/admin/template
2. Click "Test" on your template
3. Fill in test values
4. Send test email
5. If test works, issue is in code. If test fails, issue is in EmailJS setup.

### 7. Verify EmailJS SDK is Loading
1. Open browser console
2. Type: `typeof emailjs`
3. Should return: `"object"` (not `"undefined"`)
4. If `undefined`, EmailJS SDK isn't loading - check network tab

### 8. Check Network Tab
1. Open browser DevTools → Network tab
2. Submit form
3. Look for request to `api.emailjs.com`
4. Check:
   - Request status (should be 200)
   - Response body (should show success or error)

### 9. Common Error Messages

**"Invalid public key"**
- Public key is wrong or missing
- Check: `EMAILJS_PUBLIC_KEY` in script.js

**"Service not found"**
- Service ID is wrong
- Check: `EMAILJS_SERVICE_ID` in script.js matches dashboard

**"Template not found"**
- Template ID is wrong
- Check: Template IDs in script.js match dashboard

**"Template variables mismatch"**
- Template uses variables that don't match code
- Check template variables match what code sends

**"Quota exceeded"**
- Monthly email limit reached
- Upgrade plan or wait for reset

### 10. Debug Steps
1. Open browser console (F12)
2. Submit contact form
3. Look for console logs:
   - "EmailJS initialized successfully ✓"
   - "EmailJS Config: {...}"
   - "Sending email via EmailJS..."
   - "EmailJS response: {...}"
   - Any error messages

4. Check EmailJS dashboard:
   - Go to https://dashboard.emailjs.com/admin/logs
   - Look for recent email attempts
   - Check status (sent, failed, etc.)

### 11. Quick Test
Run this in browser console to test EmailJS:
```javascript
emailjs.send(
    'service_o6blrnk',
    'template_zz1sxwj',
    {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Email',
        message: 'This is a test message',
        to_email: 'inquiries@kcoh.ca'
    }
).then(
    (response) => console.log('SUCCESS!', response.status, response.text),
    (error) => console.error('FAILED...', error)
);
```

If this works, the issue is in form submission code.
If this fails, the issue is in EmailJS configuration.

## Still Not Working?
1. Check all console errors
2. Verify all IDs match EmailJS dashboard exactly
3. Test template directly in EmailJS dashboard
4. Check EmailJS service is active
5. Verify email address in service settings
6. Check spam folder
7. Verify EmailJS quota not exceeded

