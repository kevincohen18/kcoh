# Form Setup Instructions

The contact and newsletter forms are now functional! You have two options for handling form submissions:

## Option 1: EmailJS (Recommended)

EmailJS is a free service that allows you to send emails directly from your static website without a backend.

### Setup Steps:

1. **Create an EmailJS account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (100 emails/month free)

2. **Add Email Service**
   - Go to Email Services in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy your Service ID

3. **Create Email Templates**
   - Go to Email Templates
   - Create a template for Contact Form:
     - Template Name: "Contact Form"
     - Subject: "New Contact Form Submission"
     - Content:
       ```
       From: {{from_name}} ({{from_email}})
       Subject: {{subject}}
       
       Message:
       {{message}}
       ```
   - Create a template for Newsletter:
     - Template Name: "Newsletter Signup"
     - Subject: "New Newsletter Subscription"
     - Content:
       ```
       New newsletter subscription:
       Email: {{email}}
       ```

4. **Get Your Public Key**
   - Go to Account > API Keys
   - Copy your Public Key

5. **Update script.js**
   - Open `script.js`
   - Replace the following values:
     ```javascript
     const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your public key
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID
     const EMAILJS_CONTACT_TEMPLATE = 'YOUR_CONTACT_TEMPLATE_ID'; // Replace with contact template ID
     const EMAILJS_NEWSLETTER_TEMPLATE = 'YOUR_NEWSLETTER_TEMPLATE_ID'; // Replace with newsletter template ID
     ```

## Option 2: Fallback (Current Setup)

If EmailJS is not configured, the forms will:
- **Contact Form**: Open the user's email client with a pre-filled message
- **Newsletter Form**: Store subscriptions in browser localStorage (for testing)

## Features Included:

✅ Form validation (email format, required fields)
✅ Loading states during submission
✅ Success/error messages
✅ EmailJS integration
✅ Fallback to mailto links
✅ Newsletter subscription storage
✅ Error handling

## Testing:

1. Test the contact form with valid data
2. Test with invalid email addresses
3. Test with empty required fields
4. Verify success/error messages appear correctly

## Production:

Once EmailJS is configured, all form submissions will be sent directly to your email address (inquiries@kcoh.ca).

---

**Note**: The forms are currently using the fallback method. Configure EmailJS for full functionality.

