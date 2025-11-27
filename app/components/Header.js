"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";
import { Squeeze as Hamburger } from "hamburger-react";
import MagnetEffect from "./gsap/MagnetEffect";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Create the timeline but don't start it
    timelineRef.current = gsap.timeline({ paused: true });

    // Navigation animation
    timelineRef.current.to(navRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1.5,
      ease: "power4.inOut",
    });
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  };
  const linkMenuClose = () => {
    setIsMenuOpen(false);
    timelineRef.current.reverse();
  };

  return (
    <>
      <div className="fixed w-full py-2 justify-between items-center flex px-4 sm:px-10 z-50">
        <MagnetEffect>
          <div className="part-1 cursor-pointer" onClick={linkMenuClose}>
            <img src="/LEXI.png" alt="logo" className="h-14 sm:h-20 " />
          </div>
        </MagnetEffect>
        <MagnetEffect>
          <div className="part-2 bg-white  rounded-full">
            <Hamburger
              toggled={isMenuOpen}
              toggle={toggleMenu}
              duration={0.6}
              size={25}
            />
          </div>
        </MagnetEffect>
      </div>

      <Navbar ref={navRef} linkMenuClose={linkMenuClose} />
    </>
  );
};

export default Header;
