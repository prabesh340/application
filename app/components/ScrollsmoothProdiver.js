"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider() {
  useEffect(() => {
    //Only run in browser and on larger screens
    if (typeof window === "undefined" || window.innerWidth <= 700) return;

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
    //   smoothWheel: true,
        syncTouch: true,
      duration: 1.2, // Reduced from 1.4 for better performance
      wheelMultiplier: 1, // Adjust scroll speed
      touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert to milliseconds
    });

    gsap.ticker.lagSmoothing(0); // Prevent GSAP from trying to catch up on lag

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return null;
}