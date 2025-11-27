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
  const pillRef = useRef(null);
  const currentImageIdRef = useRef(0);
  const navContainerRef = useRef(null);

  useGSAP(() => {
    // Set initial state - default visible, all nav images hidden
    gsap.set(defaultRef.current, { zIndex: 10, opacity: 1 });
    NavImage.forEach((img) => {
      gsap.set(imgRefs.current[img.key], { zIndex: 0, opacity: 0 });
    });
  });

  const showImage = (linkId, linkIndex) => {
    const targetImageId = linkIndex + 1;
    const rotationValue = 0;

    // Rotate the pill container
    gsap.to(pillRef.current, {
      rotation: rotationValue,
      duration: 0.4,
      onComplete: function () {
        gsap.set(pillRef.current, {
          rotation: 0,
        });
      },
    });

    // Hide default image
    gsap.set(defaultRef.current, {
      zIndex: 0,
      opacity: 0,
    });

    // Hide all nav images
    NavImage.forEach((img) => {
      gsap.set(imgRefs.current[img.key], {
        zIndex: 0,
        opacity: 0,
      });
    });

    // Show target image
    gsap.set(imgRefs.current[linkId], {
      zIndex: 10,
      opacity: 1,
    });

    currentImageIdRef.current = targetImageId;
  };

  const showDefaultImage = () => {
    const rotationValue = 0;

    // Rotate the pill container
    gsap.to(pillRef.current, {
      rotation: rotationValue,
      duration: 0.4,
      onComplete: function () {
        gsap.set(pillRef.current, {
          rotation: 0,
        });
      },
    });

    // Hide all nav images
    NavImage.forEach((img) => {
      gsap.set(imgRefs.current[img.key], {
        zIndex: 0,
        opacity: 0,
      });
    });

    // Show default image
    gsap.set(defaultRef.current, {
      zIndex: 10,
      opacity: 1,
    });

    currentImageIdRef.current = 0;
  };

  const handleNavMouseMove = (e) => {
    const target = e.target.closest('a');
    if (target && target.id) {
      const rect = target.getBoundingClientRect();
      const mouseY = e.clientY;
      const linkCenter = rect.top + rect.height / 2;
      const threshold = rect.height * 0.3; // 30% from center
      
      // Only trigger if mouse is within center 60% of the link (30% on each side)
      const distanceFromCenter = Math.abs(mouseY - linkCenter);
      
      if (distanceFromCenter <= threshold) {
        const linkIndex = navLinks.findIndex(link => link.id === target.id);
        if (linkIndex !== -1 && hoveredIdx !== linkIndex) {
          setHoveredIdx(linkIndex);
          showImage(target.id, linkIndex);
        }
      }
    }
  };

  const handleNavMouseLeave = () => {
    setHoveredIdx(null);
    showDefaultImage();
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
          <nav 
            ref={navContainerRef}
            className="text-center w-full"
            onMouseMove={handleNavMouseMove}
            onMouseLeave={handleNavMouseLeave}
          >
            <ul
              className={`space-y-4 md:space-y-2 text-5xl md:text-9xl tracking-tighter font-bold text-[#ffff] ${antonio.className}`}
            >
              {navLinks.map((link, idx) => {
                return (
                  <li key={link.id}>
                    <Link
                      id={link.id}
                      href={link.href}
                      className={`capitalize leading-0.5 transition-opacity duration-200 ease-out ${
                        hoveredIdx === null
                          ? ""
                          : hoveredIdx === idx
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
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
          <div ref={pillRef} className="w-full h-full relative">
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
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;