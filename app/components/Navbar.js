"use client";
import React, { forwardRef, useState } from "react";
import { Antonio } from "next/font/google";
import { navLinks } from "@/constants";
import Link from "next/link";
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});
const Navbar = forwardRef(({ linkMenuClose }, ref) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div
      ref={ref}
      className="fixed h-screen w-full bg-[#58AD6F] z-40"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Navigation Links Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-1/2 md:h-full">
          <nav className="text-center w-full">
            <ul
              className={`space-y-4 md:space-y-2 text-5xl md:text-9xl tracking-tighter font-bold text-[#ffff] ${antonio.className}`}
            >
              {navLinks.map((link, idx) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className={`capitalize transition-opacity duration-200 ${
                        hoveredIdx === null
                          ? ""
                          : hoveredIdx === idx
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={linkMenuClose}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        {/* Photo Section - hidden on mobile */}
        <div className="hidden md:flex justify-center items-center w-full md:w-1/2 h-1/2 md:h-full bg-white">
          <img
            src="/can1.webp"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
