"use client";
import React, { forwardRef } from "react";
import { antonio } from "../(index)/layout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
const TextApper = forwardRef((props, ref) => {
  const textapper = React.useRef(null);
  React.useImperativeHandle(ref, () => textapper.current);

  useGSAP(
    () => {
      const split = new SplitText(textapper.current.querySelector(".op-text"), {
        type: "words",
      });
      const para = new SplitText(textapper.current.querySelector("p"), {
        type: "lines,words",

        mask: "lines",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textapper.current,
          start: "10% center",
          end: "bottom bottom",
          scrub: true,
        },
      });
      tl.from(split.words, {
        opacity: 0.4,
        stagger: 0.8,
        ease: "power2.out",
      });
      const texttl = gsap.timeline({
        scrollTrigger: {
          trigger: textapper.current,
          start: "30% center",
          toggleActions: "play none none reverse",
        },
      });
      texttl
        .from(
          para.lines,
          {
            y: 40,
            stagger: 0.2,
            ease: "power2.out",
          },
          "same"
        )
        .from(
          para.words,
          {
            y: 40,
            stagger: 0.02,
            ease: "power2.out",
          },
          "same"
        );
    },

    { scope: textapper }
  );

  return (
    <div
      ref={textapper}
      className="relative min-h-screen bg-[#b9f8cf] z-7 flex flex-col gap-y-6 justify-center items-center px-4 "
    >
      <h1
        className={`w-full md:w-3/4 lg:w-3/5  text-center font-black text-[#034d23] 
          text-5xl sm:text-6xl md:text-8xl lg:text-7xl xl:text-[90px] op-text uppercase
          ${antonio.className} `}
      >
        Fire up your fearless past and fuel your future with every gulp of
        energy
      </h1>
      <p className="w-none sm:w-1/4 text-xs sm:text-xl text-center  text-[#034d23] ">
        Rev up your rebel spirit and chase the wild beat of life, where every
        chug sparks epic nostalgia and fearless fun
      </p>
    </div>
  );
});

export default TextApper;
