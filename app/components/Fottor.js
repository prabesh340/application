"use client"

import React from 'react';
import { antonio } from '../(index)/layout';
import { Youtube, Instagram, Facebook, Mail, MapPin, Phone, Heart, Clock, Globe, Sparkles } from 'lucide-react';

import { useState } from 'react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Fottor = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address (e.g. user@email.com)");
      return;
    }
    setError("");
    setSuccess("Thank you! We'll keep you updated.");
    setEmail("");
  };

  return (
    <footer
      className="footer-container bg-[#222123] text-[#F8F8F8] w-full relative overflow-hidden border-t border-white/10 min-h-[540px] pb-10 pt-2 px-2 md:px-0"
    >
      <div
        className={antonio.className + " text-center font-bold mx-auto mt-12 mb-10 leading-none text-[#F8F8F8] drop-shadow-lg select-none"}
        style={{fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.05em'}}
      >
        #DrinkToMake <Heart size={56} className="inline align-middle ml-2 text-[#F8F8F8]" strokeWidth={1.5} fill="#F8F8F8" />
      </div>
      <div className="flex justify-center gap-10 mb-10">
        <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
          className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#F8F8F8] bg-transparent hover:bg-[#F8F8F8]/10 transition">
          <Youtube className="text-[#F8F8F8]" size={32} strokeWidth={1.5} />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
          className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#F8F8F8] bg-transparent hover:bg-[#F8F8F8]/10 transition">
          <Instagram className="text-[#F8F8F8]" size={32} strokeWidth={1.5} />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
          className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#F8F8F8] bg-transparent hover:bg-[#F8F8F8]/10 transition">
          <Facebook className="text-[#F8F8F8]" size={32} strokeWidth={1.5} />
        </a>
      </div>
      <div className="flex flex-wrap justify-center items-start w-full mb-10 gap-8 md:gap-16">
        {/* Email input section */}
        <form
          className="min-w-[280px] max-w-xs flex-1 flex flex-col items-start mx-auto"
          onSubmit={handleEmailSubmit}
          noValidate
        >
          <label
            htmlFor="footer-email"
            className="text-[#F8F8F8] text-base mb-2 font-medium tracking-wide opacity-90"
          >
            Enter your email
          </label>
          <div className="flex items-center w-full border-b-2 border-[#F8F8F8] pb-1 relative">
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder=""
              className="bg-transparent border-none outline-none text-[#F8F8F8] text-base flex-1 py-2 font-sans placeholder:text-[#F8F8F8]/60"
              autoComplete="email"
              required
            />
            <button
              type="submit"
              aria-label="Send email"
              className="bg-none border-none cursor-pointer ml-2 flex items-center p-0"
            >
              <Mail className="text-[#F8F8F8]" size={28} strokeWidth={1.5} />
            </button>
          </div>
          {error && (
            <div className="text-red-400 text-xs mt-2 font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-xs mt-2 font-medium">{success}</div>
          )}
        </form>
        {/* Extra details: contact info and more */}
        <div className="min-w-[200px] max-w-xs flex-1 flex flex-col items-start gap-2 mx-auto text-base opacity-95">
          <div className="flex items-center gap-2"><MapPin size={20} className="text-[#F8F8F8] mr-1" />1234 Energy Ave, Kathmandu, Nepal</div>
          <div className="flex items-center gap-2"><Phone size={20} className="text-[#F8F8F8] mr-1" />+977 9800000000</div>
          <div className="flex items-center gap-2"><Mail size={20} className="text-[#F8F8F8] mr-1" />info@lexi.com</div>
          <div className="flex items-center gap-2"><Clock size={20} className="text-[#F8F8F8] mr-1" />Open: 8am - 10pm</div>
          <div className="flex items-center gap-2"><Globe size={20} className="text-[#F8F8F8] mr-1" />www.lexi.com</div>
          <div className="flex items-center gap-2"><Sparkles size={20} className="text-[#F8F8F8] mr-1" />Premium Energy for You</div>
        </div>
      </div>
      <div className="w-full border-t border-white/15 mt-10 pt-4 flex flex-col items-center text-base text-[#F8F8F8] opacity-85">
        <div className="mb-1 text-center font-normal">&copy; 2025 lexi – all rights reserved</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#" className="underline opacity-90 hover:opacity-100">Privacy Policy</a>
          <a href="#" className="underline opacity-90 hover:opacity-100">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Fottor;