import React from "react";

const Findus = () => {
  return (
  <div className="w-full h-[80vh] max-h-[900px] relative overflow-hidden flex items-center justify-center mx-auto my-8 shadow-2xl">
      {/* Map background */}
      <img
        src="/map.svg"
        alt="Map Illustration"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      {/* Overlayed Text and Button */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 py-12 z-10">
        <h2
          className="text-white drop-shadow-lg text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight uppercase"
          style={{ fontFamily: 'Antonio, sans-serif', letterSpacing: '-0.04em' }}
        >
          Find Us
        </h2>
        <p
          className="text-white/90 drop-shadow text-lg sm:text-xl md:text-2xl mb-8 max-w-md"
          style={{ fontFamily: 'Antonio, sans-serif', letterSpacing: '-0.01em' }}
        >
          Discover our refreshing drinks at locations near you. Sip, chill, and enjoy the taste of summer—anytime, anywhere.
        </p>
        <a
          href="https://www.google.com/maps/search/drinks+near+me/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 text-amber-700 font-black px-8 py-3 rounded-full shadow-lg text-lg md:text-xl transition hover:bg-amber-100 hover:scale-105 active:scale-95 inline-block"
          style={{ fontFamily: 'Antonio, sans-serif', letterSpacing: '0.02em' }}
        >
          Find Nearest Store
        </a>
      </div>
    </div>
  );
};

export default Findus;
