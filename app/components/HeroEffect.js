"use client"
import React, { useRef } from "react";
import Hero from "./Hero";
import TextApper from "./TextApper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroEffect = () => {
  const container = useRef();
  const hero = useRef();
  const textapper = useRef();

  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth <= 700) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".box",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });

    tl.to(
      hero.current,
      {
        scale: 0.8,
        rotate: -5,
      },
      "same"
    );
    tl.from(
      textapper.current,
      {
        scale: 0.8,
        rotate: -5,
      },
      "same"
    );
  }, [container.current]);
  return (
    <div  ref={container} className="box relative h-[200vh] z-5 bg-[#222123]">
      <Hero ref={hero} />
      <TextApper ref={textapper} />
    </div>
  );
};

export default HeroEffect;
