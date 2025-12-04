"use client";
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Lock, AlertCircle, Wallet, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { shippingConfig } from '../../constants';
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3';
import toast, { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const CheckoutForm = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const router = useRouter();
  const { executeRecaptcha } = useReCaptcha();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      paymentMethod: 'card'
    }
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.discounted_cost.replace('Rs ', ''));
    return sum + (price * item.quantity);
  }, 0);
  const tax = subtotal * shippingConfig.taxRate;
  const shipping = subtotal > shippingConfig.freeShippingThreshold ? 0 : shippingConfig.shippingCost;
  const total = subtotal + tax + shipping;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token (with fallback if not available)
      let token = 'no-recaptcha';
      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha('checkout');
        } catch (error) {
          console.warn('reCAPTCHA error:', error);
          // Continue without reCAPTCHA if it fails
        }
      }

      // Prepare order data
      const orderData = {
        contactInfo: {
          firstName: data.fullName.split(' ')[0] || data.fullName,
          lastName: data.fullName.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone: data.phone,
        },
        shippingAddress: {
          street: data.address,
          city: data.city,
          province: data.state,
          postalCode: data.zipCode,
        },
        paymentInfo: {
          method: paymentMethod,
          ...(paymentMethod === 'card' && {
            cardNumber: data.cardNumber,
            cardName: data.cardName,
            expiryDate: data.expiryDate,
            cvv: data.cvv,
          }),
        },
        items: cartItems,
      };

      // Send order to API
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          recaptchaToken: token,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully! Check your email for confirmation.');
        clearCart();
        setTimeout(() => {
          router.push('/products');
        }, 2000);
      } else {
        toast.error(result.error || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom validation error component
  const ErrorMessage = ({ message }) => (
    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <main className={`min-h-screen w-full bg-white ${poppins.className}`}>
        <Toaster position="bottom-center" />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen w-full bg-white ${poppins.className}`}>
      <Toaster position="bottom-center" />
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
          <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex flex-col lg:flex-row w-full min-h-screen gap-0">
        {/* Left: Form */}
        <div className="w-full lg:w-3/5 bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 lg:py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Contact Information</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName", { 
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    className={`w-full rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                    placeholder="Ram Karki"
                  />
                  {errors.fullName && <ErrorMessage message={errors.fullName.message} />}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                    placeholder="ram.karki@gmail.com"
                  />
                  {errors.email && <ErrorMessage message={errors.email.message} />}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Invalid phone number"
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits"
                      }
                    })}
                    className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                    placeholder="9767599798"
                  />
                  {errors.phone && <ErrorMessage message={errors.phone.message} />}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Shipping Address</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register("address", { 
                      required: "Street address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters"
                      }
                    })}
                    className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                    placeholder="Thamel, Ward 26"
                  />
                  {errors.address && <ErrorMessage message={errors.address.message} />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city", { 
                        required: "City is required",
                        minLength: {
                          value: 2,
                          message: "City name is too short"
                        }
                      })}
                      className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                      placeholder="Kathmandu"
                    />
                    {errors.city && <ErrorMessage message={errors.city.message} />}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...register("state", { 
                        required: "Province is required",
                        minLength: {
                          value: 2,
                          message: "Province is required"
                        }
                      })}
                      className={`w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                      placeholder="Bagmati"
                    />
                    {errors.state && <ErrorMessage message={errors.state.message} />}
                  </div>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register("zipCode", { 
                      required: "Postal code is required",
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: "Invalid postal code (use 5 digits)"
                      }
                    })}
                    className={`w-full rounded-md border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                    placeholder="44600"
                  />
                  {errors.zipCode && <ErrorMessage message={errors.zipCode.message} />}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight flex items-center gap-2">
                <CreditCard size={24} />
                Payment Information
              </h2>
              <div className="space-y-5">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard size={20} />
                      <span className="font-medium">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'cash' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Wallet size={20} />
                      <span className="font-medium">Cash</span>
                    </button>
                  </div>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        {...register("cardNumber", { 
                          required: paymentMethod === 'card' ? "Card number is required" : false,
                          pattern: {
                            value: /^[0-9\s]{13,19}$/,
                            message: "Invalid card number (13-16 digits)"
                          }
                        })}
                        className={`w-full rounded-md border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <ErrorMessage message={errors.cardNumber.message} />}
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        {...register("cardName", { 
                          required: paymentMethod === 'card' ? "Cardholder name is required" : false,
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters"
                          }
                        })}
                        className={`w-full rounded-md border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                        placeholder="Ram Karki"
                      />
                      {errors.cardName && <ErrorMessage message={errors.cardName.message} />}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          {...register("expiryDate", { 
                            required: paymentMethod === 'card' ? "Expiry date is required" : false,
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                              message: "Invalid format (use MM/YY)"
                            }
                          })}
                          className={`w-full rounded-md border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                        {errors.expiryDate && <ErrorMessage message={errors.expiryDate.message} />}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          {...register("cvv", { 
                            required: paymentMethod === 'card' ? "CVV is required" : false,
                            pattern: {
                              value: /^[0-9]{3,4}$/,
                              message: "Invalid CVV (3-4 digits)"
                            }
                          })}
                          className={`w-full rounded-md border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white`}
                          placeholder="123"
                          maxLength="4"
                        />
                        {errors.cvv && <ErrorMessage message={errors.cvv.message} />}
                      </div>
                    </div>
                  </>
                )}

                {/* Cash on Delivery Message */}
                {paymentMethod === 'cash' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Wallet size={20} className="text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-800 mb-1">Cash on Delivery</h3>
                        <p className="text-sm text-green-700">
                          You will pay in cash when your order is delivered to your address. 
                          Please have the exact amount ready: <span className="font-bold">Rs {total.toFixed(0)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button - Desktop */}
            <div className="hidden lg:block">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-black hover:bg-gray-800 text-white font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock size={20} />
                {isSubmitting ? 'Processing...' : `Place Order - Rs ${total.toFixed(0)}`}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-2/5 bg-gray-50 px-4 sm:px-8 md:px-12 py-8 lg:py-12 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-md shrink-0 overflow-hidden">
                    <img 
                      src={item.imgUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm uppercase truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.color}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-semibold text-sm">
                        Rs {(parseFloat(item.discounted_cost.replace('Rs ', '')) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-300 pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">Rs {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax ({(shippingConfig.taxRate * 100).toFixed(0)}%)</span>
                <span className="font-medium text-gray-900">Rs {tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="text-gray-900">Rs {shipping.toFixed(0)}</span>
                  )}
                </span>
              </div>
            </div>

            {shipping > 0 && subtotal < shippingConfig.freeShippingThreshold && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-blue-800">
                  Add <span className="font-semibold">Rs {(shippingConfig.freeShippingThreshold - subtotal).toFixed(0)}</span> more for free shipping!
                </p>
              </div>
            )}

            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">Rs {total.toFixed(0)}</span>
              </div>
            </div>

            {/* Submit Button - Mobile */}
            <div className="lg:hidden mt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-black hover:bg-gray-800 text-white font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock size={20} />
                {isSubmitting ? 'Processing...' : `Place Order - Rs ${total.toFixed(0)}`}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </div>

            {/* Security Icons */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const CheckoutPage = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  // If no valid reCAPTCHA key, render without provider
  if (!siteKey || siteKey === 'your_recaptcha_site_key_here') {
    return <CheckoutForm />;
  }

  return (
    <ReCaptchaProvider 
      reCaptchaKey={siteKey}
      useEnterprise={false}
      useRecaptchaNet={false}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
      container={{
        element: 'recaptcha-container',
        parameters: {
          badge: 'inline',
          theme: 'light',
        }
      }}
    >
      <CheckoutForm />
      {/* Hidden reCAPTCHA badge container */}
      <div id="recaptcha-container" style={{ display: 'none' }}></div>
    </ReCaptchaProvider>
  );
};

export default CheckoutPage;
