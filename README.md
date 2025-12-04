# Lexi — Drink Your Way

Lexi is a modern, full-featured e-commerce web application built with Next.js 16, featuring a complete shopping cart system, secure checkout with payment processing, and automated email notifications. The site showcases a premium, zero-sugar energy drink brand with an interactive shopping experience powered by GSAP animations and smooth scrolling effects.

## 🌟 Brand Overview
**Lexi** — A movement for creators, dreamers, and doers. Premium energy drinks crafted to energize your moments with bold flavors and zero sugar.

## ✨ Core Features

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Browse all Lexi flavors with detailed product pages
- **Shopping Cart**: 
  - Floating cart with GSAP animations
  - Add/remove items with quantity controls
  - Trash icon for quick item removal
  - Real-time cart total calculations
  - Product-specific maximum quantity limits
  - Mobile-responsive design (centered on mobile, right corner on desktop)
- **Quick Add to Cart**: Add products directly from the products page
- **Toast Notifications**: Real-time feedback for user actions (max quantity alerts, success/error messages)

### 💳 Checkout System
- **Complete Checkout Flow**: Multi-step form with contact info, shipping address, and payment details
- **Payment Methods**:
  - Card Payment (with card details validation)
  - Cash on Delivery
- **Form Validation**: react-hook-form with custom error messages
- **Nepal-Specific Configuration**:
  - Currency: Nepali Rupees (Rs)
  - 13% VAT tax rate
  - Nepal address fields (Province, Postal Code)
  - Kathmandu timezone for order timestamps

### 🔐 Security & Anti-Spam
- **Google reCAPTCHA v3**: Invisible spam protection on checkout
- **Server-Side Verification**: API route validates reCAPTCHA tokens
- **Graceful Fallback**: Checkout works even if reCAPTCHA fails
- **Hidden Badge**: reCAPTCHA badge hidden via CSS for clean UI

### 📧 Email Notifications
- **Owner Notifications**: Detailed order emails sent to store owner with:
  - Customer contact information
  - Complete shipping address
  - Payment method details
  - Itemized order list
  - Price breakdown (subtotal, tax, shipping, total)
  - Professional HTML email template
- **Buyer Confirmations**: Automatic order confirmation emails to customers with:
  - Order summary and items
  - Delivery address
  - Payment method (with cash on delivery reminders)
  - Contact support information
  - Beautiful, responsive email design
- **Nodemailer Integration**: Secure email sending via Gmail SMTP

### 💰 Pricing & Shipping
- **Dynamic Pricing**: Original and discounted prices displayed
- **Free Shipping**: Automatic free shipping above Rs 500
- **Tax Calculation**: Automatic 13% VAT calculation
- **Shipping Cost**: Rs 80 for orders below free shipping threshold
- **Centralized Configuration**: Easy-to-edit constants for all pricing rules

### 🎨 UI/UX Features
- **Modern Landing Page**: Eye-catching hero section with GSAP animations
- **Product Pages**: Dedicated pages for each flavor with detailed information
- **Image Gallery**: Dynamic, scrollable gallery showcasing Lexi products
- **Smooth Scrolling**: Lenis smooth scroll throughout the site
- **Responsive Design**: Mobile-first, optimized for all screen sizes
- **Interactive Animations**: GSAP-powered transitions and hover effects
- **Custom Navigation**: Magnetic effects and image previews on hover

### 📄 Pages
- **Home (/)**: Hero section with brand showcase and featured products
- **Products (/products)**: Complete product catalog with quick add functionality
- **Product Detail (/products/[slug])**: Individual product pages with full details
- **Checkout (/checkout)**: Secure checkout flow with validation
- **Gallery (/gallery)**: Visual showcase of Lexi brand
- **About (/about)**: Brand story and mission
- **Contact (/contact)**: Contact form for customer inquiries

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React Server Components)
- **React**: Version 19
- **Styling**: Tailwind CSS 4, SCSS modules
- **Animations**: GSAP, Framer Motion
- **Forms**: react-hook-form for validation
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **Smooth Scroll**: Lenis
- **Fonts**: Antonio (brand), Poppins (checkout), Geist (default)

### Backend
- **API Routes**: Next.js API routes for server-side processing
- **Email Service**: Nodemailer (Gmail SMTP)
- **Security**: Google reCAPTCHA v3
- **Environment Variables**: Secure credential management

### State Management
- **Context API**: Global cart state with CartContext
- **Local Storage**: (Optional) Cart persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Gmail account with App Password (for email notifications)
- Google reCAPTCHA v3 site key and secret key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```env
   # reCAPTCHA Keys (from https://www.google.com/recaptcha/admin/create)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here

   # Email Configuration (Gmail)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   OWNER_EMAIL=owner@yourdomain.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Setup Instructions

See `SETUP.md` for detailed instructions on:
- Getting Google reCAPTCHA keys
- Creating Gmail App Password
- Configuring email notifications
- Troubleshooting common issues

## 📁 Project Structure

```
application/
├── app/
│   ├── (index)/          # Home page
│   ├── products/         # Product listing and detail pages
│   ├── checkout/         # Checkout page with form
│   ├── gallery/          # Image gallery
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── components/       # Reusable React components
│   │   ├── Floatingcart.js
│   │   ├── Header.js
│   │   ├── Navbar.js
│   │   └── ...
│   ├── api/
│   │   └── send-order/   # Email sending API route
│   ├── layout.js         # Root layout
│   └── globals.css       # Global styles
├── constants/
│   └── index.js          # Product data, pricing, shipping config
├── contexts/
│   └── CartContext.js    # Global cart state management
├── public/               # Static assets (images, etc.)
├── .env.local.example    # Environment variables template
├── .env.local            # Your actual credentials (gitignored)
└── package.json          # Dependencies and scripts
```

## 🎯 Key Configuration

Edit `constants/index.js` to customize:

```javascript
// Product catalog
export const cans1 = [
  {
    id: 1,
    name: "lime",
    imgUrl: "/images/6.webp",
    color: "lime",
    original_cost: "Rs 500",
    discounted_cost: "Rs 250",
    maxQuantity: 10,
  },
  // ... more products
];

// Shipping and tax settings
export const shippingConfig = {
  freeShippingThreshold: 500,  // Free shipping above this amount
  shippingCost: 80,             // Shipping cost
  taxRate: 0.13,                // 13% tax rate
  maxQuantity: 10,              // Default max quantity per product
};
```

## 📦 Dependencies

### Core
- `next`: ^16.0.7
- `react`: ^19.0.0
- `react-dom`: ^19.0.0

### UI & Styling
- `tailwindcss`: ^4.0.0
- `sass`: ^1.83.4
- `lucide-react`: ^0.469.0

### Animations
- `gsap`: ^3.12.7
- `@gsap/react`: ^2.1.1
- `lenis`: ^1.1.19

### Forms & Validation
- `react-hook-form`: ^7.54.2
- `react-hot-toast`: ^2.4.1

### Email & Security
- `nodemailer`: ^6.9.16
- `next-recaptcha-v3`: ^1.5.0

### Other
- `hamburger-react`: ^2.5.1
- `swiper`: ^11.1.15

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌍 Deployment

This is a Next.js application that can be deployed on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

Remember to set environment variables in your deployment platform!

## 📝 License

[MIT](LICENSE)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Lexi — Drink your way. Fuel your journey. #DrinkToMake** ⚡🥤
