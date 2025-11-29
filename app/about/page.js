import React from 'react'
import ImageSequence from "../components/ImageSequence";
import Fottor from '../components/Fottor';

const page = () => {
  return (
    <div>
  <section className="block md:hidden w-full px-3 py-8 pt-16 bg-[#18181b] shadow-lg text-[#f3f4f6]">
  <header className="mb-6">
    <h1 className="text-3xl font-bold tracking-tight text-white leading-tight mb-1" style={{letterSpacing: '-0.01em'}}>About Us</h1>
    <div className="text-base font-medium text-[#7fffd4] tracking-wide">#DrinkToMake</div>
  </header>
  <p className="mb-2 text-[1.08rem] leading-snug font-normal">
          Welcome to <span className="font-semibold text-[#7fffd4]">#DrinkToMake</span> — where every sip is a spark for your next adventure! Our mission is to fuel creators, dreamers, and doers with premium energy that’s as bold as your ambitions. Whether you’re chasing deadlines, exploring new horizons, or simply living life to the fullest, we’re here to keep you refreshed and inspired.
        </p>
  <p className="mb-2 text-[1.08rem] leading-snug font-normal">
          <span className="font-semibold text-[#7fffd4]">Our Story:</span> Born from a passion for innovation and a love for vibrant living, #DrinkToMake was crafted for those who refuse to settle. We believe in breaking boundaries, celebrating individuality, and empowering our community to make every moment count.
        </p>
  <ul className="list-disc pl-5 mb-3 space-y-1 text-[0.98rem]">
          <li><span className="font-semibold text-[#7fffd4]">Premium Ingredients:</span> Only the best, cleanest, and most effective ingredients go into every can.</li>
          <li><span className="font-semibold text-[#7fffd4]">Zero Sugar, Zero Guilt:</span> Enjoy the energy without the crash or compromise.</li>
          <li><span className="font-semibold text-[#7fffd4]">Sustainably Crafted:</span> We care about the planet as much as we care about your energy.</li>
          <li><span className="font-semibold text-[#7fffd4]">Community-Driven:</span> Our tribe is made up of artists, athletes, students, and everyday heroes.</li>
        </ul>
  <p className="mb-2 text-[1.08rem] leading-snug font-normal">
          <span className="font-semibold text-[#7fffd4]">Why #DrinkToMake?</span> Because life is about making things happen — making art, making friends, making memories, and making a difference. We’re more than a drink; we’re a movement. Join us and unleash your boldest self!
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="bg-[#23272e] p-4 shadow">
            <h2 className="text-base font-bold mb-1 text-[#7fffd4] uppercase tracking-wide">Our Vision</h2>
            <p className="text-[0.98rem] leading-snug">To inspire a generation to live fearlessly, create passionately, and connect authentically — one can at a time.</p>
          </div>
          <div className="bg-[#23272e] p-4 shadow">
            <h2 className="text-base font-bold mb-1 text-[#7fffd4] uppercase tracking-wide">Our Promise</h2>
            <p className="text-[0.98rem] leading-snug">Every can of #DrinkToMake is a promise of quality, taste, and a boost that keeps you going, no matter what your day brings.</p>
          </div>
        </div>
        <div className="mt-7 text-center text-[#7fffd4] text-[1.08rem] font-semibold">
          <span className="block leading-tight">Ready to make your mark?</span>
          <span className="block leading-tight">#DrinkToMake — Fuel Your Journey.</span>
        </div>
      </section>
      <ImageSequence/>
      <Fottor/>
    </div>
  )
}

export default page