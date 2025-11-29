import React from 'react';
import { Antonio } from 'next/font/google';
import Fottor from '../components/Fottor';

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'],
});


// Contact page content will be implemented below
const page = () => {
  return (
    <main className={`min-h-screen w-full bg-white ${antonio.className}`}>
      {/* Contact Section */}
      <section
        className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen gap-0 lg:gap-0"
      >
        {/* Left: Fullscreen image with overlay */}
  <div className="w-full lg:w-1/2 h-auto min-h-64 sm:min-h-80 md:min-h-96 lg:h-full relative flex items-center justify-center overflow-hidden">
          <img
            src="/can_res/can1.webp"
            alt="Get in Touch Can"
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable="false"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 py-8 sm:py-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto font-light drop-shadow">
              We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, our team is here to help.
            </p>
          </div>
        </div>
        {/* Right: Fullscreen form, no card, edge-to-edge */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full flex items-center justify-center bg-white px-0 py-0">
          <div className="w-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-8 lg:py-0 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 tracking-tight" style={{fontFamily: 'inherit'}}>
              We’re here for you — let’s connect!
            </h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="fullname" name="fullname" required className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" placeholder="you@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select id="subject" name="subject" required className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">Order Number <span className="text-gray-400">(optional)</span></label>
                <input type="text" id="orderNumber" name="orderNumber" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" placeholder="Order # (if applicable)" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={6} required className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow transition-colors duration-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
  <section className="w-full max-w-5xl mx-auto px-2 md:px-6 py-12 md:py-20 mt-8 relative">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-2 sm:px-4 md:px-0">
          {/* FAQ 1 */}
          <div className="group bg-white/90 border border-gray-100 rounded-full shadow-sm px-2 sm:px-4 md:px-10 py-10 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[120px] w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-0 absolute left-0 right-0 text-center transition-all duration-300 group-hover:opacity-0 group-hover:invisible opacity-100 visible">Where do you deliver?</h4>
            <p className="text-gray-600 mt-0 absolute left-0 right-0 text-center transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">We currently deliver to all major cities and towns nationwide. If you’re unsure about your location, please contact us and we’ll be happy to assist.</p>
          </div>
          {/* FAQ 2 */}
          <div className="group bg-white/90 border border-gray-100 rounded-full shadow-sm px-2 sm:px-4 md:px-10 py-10 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[120px] w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-0 absolute left-0 right-0 text-center transition-all duration-300 group-hover:opacity-0 group-hover:invisible opacity-100 visible">How can I track my order?</h4>
            <p className="text-gray-600 mt-0 absolute left-0 right-0 text-center transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">Once your order is shipped, you’ll receive a tracking link via email. You can also log in to your account to view your order status at any time.</p>
          </div>
          {/* FAQ 3 */}
          <div className="group bg-white/90 border border-gray-100 rounded-full shadow-sm px-2 sm:px-4 md:px-10 py-10 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[120px] w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-0 absolute left-0 right-0 text-center transition-all duration-300 group-hover:opacity-0 group-hover:invisible opacity-100 visible">Can I change or cancel my order?</h4>
            <p className="text-gray-600 mt-0 absolute left-0 right-0 text-center transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">If your order hasn’t shipped yet, you can contact us to change or cancel it. Once shipped, changes may not be possible, but we’ll do our best to help.</p>
          </div>
          {/* FAQ 4 */}
          <div className="group bg-white/90 border border-gray-100 rounded-full shadow-sm px-2 sm:px-4 md:px-10 py-10 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[120px] w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-0 absolute left-0 right-0 text-center transition-all duration-300 group-hover:opacity-0 group-hover:invisible opacity-100 visible">What if I have a problem with my delivery?</h4>
            <p className="text-gray-600 mt-0 absolute left-0 right-0 text-center transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">If you experience any issues with your delivery, please reach out to us right away. Our support team is here to resolve any concerns quickly and efficiently.</p>
          </div>
        </div>
      </section>
      <Fottor/>
    </main>
  );
}

export default page