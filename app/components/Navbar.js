"use client";
import React, { forwardRef, useState, useRef } from "react";
import { Antonio } from "next/font/google";
import { navLinks, NavImage, defaultImg } from "@/constants";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

const Navbar = forwardRef(({ linkMenuClose }, ref) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const imgRefs = useRef({});
  const defaultRef = useRef(null);
  const currentImgRef = useRef(null);

  useGSAP(() => {
    // Set initial state
    gsap.set(defaultRef.current, { autoAlpha: 1, scale: 1 });
    NavImage.forEach((img) => {
      gsap.set(imgRefs.current[img.key], { autoAlpha: 0, scale: 1.1 });
    });
  });

  const handleMouseEnter = (linkId) => {
    setHoveredIdx(navLinks.findIndex(link => link.id === linkId));
    
    // Hide default image smoothly
    gsap.to(defaultRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // Hide current image if exists
    if (currentImgRef.current && currentImgRef.current !== linkId) {
      gsap.to(imgRefs.current[currentImgRef.current], {
        autoAlpha: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Show new image with smooth transition
    gsap.fromTo(
      imgRefs.current[linkId],
      { autoAlpha: 0, scale: 1.1 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    currentImgRef.current = linkId;
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    
    // Hide all nav images
    NavImage.forEach((img) => {
      gsap.to(imgRefs.current[img.key], {
        autoAlpha: 0,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.in"
      });
    });

    // Show default image
    gsap.to(defaultRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1
    });

    currentImgRef.current = null;
  };

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
                      id={link.id}
                      href={link.href}
                      className={`capitalize transition-opacity duration-300 ease-out ${
                        hoveredIdx === null
                          ? ""
                          : hoveredIdx === idx
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                      onMouseEnter={() => handleMouseEnter(link.id)}
                      onMouseLeave={handleMouseLeave}
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
        <div className="hidden md:flex justify-center items-center w-full md:w-1/2 h-1/2 md:h-full bg-white relative overflow-hidden">
          <img
            ref={defaultRef}
            src={defaultImg}
            alt="default"
            className="object-cover w-full h-full absolute top-0 left-0"
          />
          {NavImage.map((img) => (
            <img
              key={img.key}
              ref={(el) => (imgRefs.current[img.key] = el)}
              src={img.url}
              alt={img.class}
              className="object-cover w-full h-full absolute top-0 left-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;