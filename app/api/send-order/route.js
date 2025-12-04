import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderData, recaptchaToken } = body;

    // Verify reCAPTCHA token (skip if using fallback token)
    if (recaptchaToken && recaptchaToken !== 'no-recaptcha') {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      // Check if reCAPTCHA verification failed
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.warn('reCAPTCHA verification failed:', recaptchaData);
        // Continue anyway - don't block orders
      }
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Calculate order totals
    const subtotal = orderData.items.reduce((sum, item) => {
      const price = parseFloat(item.discounted_cost.replace('Rs ', ''));
      return sum + (price * item.quantity);
    }, 0);

    const tax = subtotal * 0.13;
    const shipping = subtotal > 500 ? 0 : 80;
    const total = subtotal + tax + shipping;

    // Prepare email HTML content
    const itemsHTML = orderData.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          <small style="color: #666;">${item.color}</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          Rs ${(parseFloat(item.discounted_cost.replace('Rs ', '')) * item.quantity).toFixed(0)}
        </td>
      </tr>
    `).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .section { background-color: #fff; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          .total-row { font-weight: bold; font-size: 18px; }
          .info-row { margin-bottom: 8px; }
          .label { font-weight: bold; display: inline-block; width: 140px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received!</h1>
          </div>
          <div class="content">
            <!-- Customer Information -->
            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="info-row"><span class="label">Name:</span> ${orderData.contactInfo.firstName} ${orderData.contactInfo.lastName}</div>
              <div class="info-row"><span class="label">Email:</span> ${orderData.contactInfo.email}</div>
              <div class="info-row"><span class="label">Phone:</span> ${orderData.contactInfo.phone}</div>
            </div>

            <!-- Shipping Address -->
            <div class="section">
              <div class="section-title">Shipping Address</div>
              <div class="info-row"><span class="label">Street:</span> ${orderData.shippingAddress.street}</div>
              <div class="info-row"><span class="label">City:</span> ${orderData.shippingAddress.city}</div>
              <div class="info-row"><span class="label">Province:</span> ${orderData.shippingAddress.province}</div>
              <div class="info-row"><span class="label">Postal Code:</span> ${orderData.shippingAddress.postalCode}</div>
            </div>

            <!-- Payment Information -->
            <div class="section">
              <div class="section-title">Payment Method</div>
              <div class="info-row">
                <strong>${orderData.paymentInfo.method === 'card' ? 'Card Payment' : 'Cash on Delivery'}</strong>
              </div>
              ${orderData.paymentInfo.method === 'card' ? `
                <div class="info-row"><span class="label">Card Number:</span> **** **** **** ${orderData.paymentInfo.cardNumber.slice(-4)}</div>
                <div class="info-row"><span class="label">Cardholder:</span> ${orderData.paymentInfo.cardName}</div>
              ` : ''}
            </div>

            <!-- Order Items -->
            <div class="section">
              <div class="section-title">Order Items</div>
              <table>
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: center;">Quantity</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>

            <!-- Order Summary -->
            <div class="section">
              <div class="section-title">Order Summary</div>
              <table>
                <tr>
                  <td style="padding: 8px;">Subtotal:</td>
                  <td style="padding: 8px; text-align: right;">Rs ${subtotal.toFixed(0)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">Tax (13%):</td>
                  <td style="padding: 8px; text-align: right;">Rs ${tax.toFixed(0)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">Shipping:</td>
                  <td style="padding: 8px; text-align: right;">${shipping === 0 ? 'FREE' : 'Rs ' + shipping.toFixed(0)}</td>
                </tr>
                <tr class="total-row" style="border-top: 2px solid #000;">
                  <td style="padding: 12px;">Total:</td>
                  <td style="padding: 12px; text-align: right;">Rs ${total.toFixed(0)}</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
              <p>Order received on ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Buyer confirmation email HTML
    const buyerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: #fff; padding: 30px 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .section { background-color: #fff; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          .total-row { font-weight: bold; font-size: 18px; }
          .info-row { margin-bottom: 8px; }
          .label { font-weight: bold; display: inline-block; width: 120px; }
          .success-badge { background-color: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Order Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your order</p>
          </div>
          <div class="content">
            <div class="section" style="text-align: center;">
              <div class="success-badge">Order Confirmed</div>
              <p style="font-size: 16px; color: #666; margin-top: 10px;">
                Hi ${orderData.contactInfo.firstName}, we've received your order and will process it shortly.
              </p>
            </div>

            <!-- Order Items -->
            <div class="section">
              <div class="section-title">Your Order</div>
              <table>
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>

            <!-- Order Summary -->
            <div class="section">
              <div class="section-title">Order Summary</div>
              <table>
                <tr>
                  <td style="padding: 8px;">Subtotal:</td>
                  <td style="padding: 8px; text-align: right;">Rs ${subtotal.toFixed(0)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">Tax (13%):</td>
                  <td style="padding: 8px; text-align: right;">Rs ${tax.toFixed(0)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">Shipping:</td>
                  <td style="padding: 8px; text-align: right;">${shipping === 0 ? 'FREE' : 'Rs ' + shipping.toFixed(0)}</td>
                </tr>
                <tr class="total-row" style="border-top: 2px solid #000;">
                  <td style="padding: 12px;">Total:</td>
                  <td style="padding: 12px; text-align: right;">Rs ${total.toFixed(0)}</td>
                </tr>
              </table>
            </div>

            <!-- Shipping Address -->
            <div class="section">
              <div class="section-title">Delivery Address</div>
              <p style="margin: 5px 0; color: #666;">
                ${orderData.shippingAddress.street}<br>
                ${orderData.shippingAddress.city}, ${orderData.shippingAddress.province}<br>
                Postal Code: ${orderData.shippingAddress.postalCode}
              </p>
            </div>

            <!-- Payment Method -->
            <div class="section">
              <div class="section-title">Payment Method</div>
              <p style="margin: 5px 0; color: #666;">
                ${orderData.paymentInfo.method === 'card' ? '💳 Card Payment' : '💵 Cash on Delivery'}
              </p>
              ${orderData.paymentInfo.method === 'cash' ? `
                <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 12px; margin-top: 10px;">
                  <p style="margin: 0; font-size: 14px; color: #92400e;">
                    ⚠️ Please keep <strong>Rs ${total.toFixed(0)}</strong> ready in cash for payment upon delivery.
                  </p>
                </div>
              ` : ''}
            </div>

            <!-- Contact Info -->
            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="info-row"><span class="label">Email:</span> ${orderData.contactInfo.email}</div>
              <div class="info-row"><span class="label">Phone:</span> ${orderData.contactInfo.phone}</div>
            </div>

            <div style="text-align: center; color: #666; font-size: 14px; margin-top: 20px; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
              <p style="margin: 0 0 10px 0; font-weight: bold;">Need Help?</p>
              <p style="margin: 0;">Contact us at <a href="mailto:${process.env.OWNER_EMAIL}" style="color: #000;">${process.env.OWNER_EMAIL}</a></p>
              <p style="margin: 10px 0 0 0; font-size: 12px;">Order placed on ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Owner email options
    const ownerMailOptions = {
      from: `"${orderData.contactInfo.firstName} ${orderData.contactInfo.lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Order from ${orderData.contactInfo.firstName} ${orderData.contactInfo.lastName} - Rs ${total.toFixed(0)}`,
      html: emailHTML,
      replyTo: orderData.contactInfo.email,
    };

    // Buyer confirmation email options
    const buyerMailOptions = {
      from: `"Lexi - Drink Your Way" <${process.env.EMAIL_USER}>`,
      to: orderData.contactInfo.email,
      subject: `Order Confirmation - Rs ${total.toFixed(0)}`,
      html: buyerEmailHTML,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(buyerMailOptions)
    ]);

    return NextResponse.json(
      { success: true, message: 'Order emails sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { error: 'Failed to send order email. Please try again.' },
      { status: 500 }
    );
  }
}
