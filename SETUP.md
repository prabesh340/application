# Setup Instructions for Email & reCAPTCHA

## 1. Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
2. Register a new site with these settings:
   - **Label**: Your app name (e.g., "Lexi Application")
   - **reCAPTCHA type**: Choose **reCAPTCHA v3**
   - **Domains**: Add your domain(s):
     - `localhost` (for development)
     - `your-production-domain.com` (for production)
3. Click **Submit**
4. Copy the **Site Key** and **Secret Key**

## 2. Email Configuration (Gmail)

### Option A: Using Gmail with App Password (Recommended)

1. Enable 2-Step Verification on your Google Account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable **2-Step Verification**

2. Create an App Password:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select app: **Mail**
   - Select device: **Other** (enter "Next.js App")
   - Click **Generate**
   - Copy the 16-character password (remove spaces)

### Option B: Using Other Email Services

For services like SendGrid, Mailgun, or others:
- Change `EMAIL_SERVICE` in `.env.local`
- Use their SMTP credentials

## 3. Environment Variables Setup

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   # reCAPTCHA Keys
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key
   RECAPTCHA_SECRET_KEY=your_actual_secret_key

   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password

   # Owner Email
   OWNER_EMAIL=owner@yourdomain.com
   ```

3. **Never commit `.env.local` to Git** - it's already in `.gitignore`

## 4. Testing

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `/checkout` and complete a test order

3. Check your owner email for the order notification

## Security Notes

- ✅ reCAPTCHA v3 runs invisibly and scores user interactions
- ✅ API route verifies reCAPTCHA token server-side (score threshold: 0.5)
- ✅ Email credentials are stored securely in environment variables
- ✅ Never expose `RECAPTCHA_SECRET_KEY` or `EMAIL_PASSWORD` in client code
- ✅ Card details are sent via email (consider adding encryption for production)

## Troubleshooting

### reCAPTCHA Issues
- **"reCAPTCHA verification failed"**: Check if your domain is registered in reCAPTCHA admin
- **Score too low**: User might be flagged as bot - adjust threshold in `/app/api/send-order/route.js` (line 24)

### Email Issues
- **"Invalid login"**: Make sure you're using an App Password, not your regular Gmail password
- **"EAUTH"**: Double-check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`
- **Emails not arriving**: Check spam folder, verify `OWNER_EMAIL` is correct

### General
- Make sure `.env.local` exists and has correct values
- Restart dev server after changing environment variables
- Check browser console and terminal for error messages
