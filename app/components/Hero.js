"use client";
import Image from "next/image";
import React, { use, useRef } from "react";
import { Anton } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { fruits } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});
const Hero = () => {
  const hero = useRef(null);
  const [step, setStep] = React.useState(0);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      // Step 1
      tl.addLabel("step1")
        .to(
          ".text_part",
          { yPercent: -36.8, ease: "power2.out", duration: 1.5 },
          "step1"
        )
        .to(
          ".can_img_1",
          { y: "100%", duration: 1, ease: "back.out(-4)" },
          "step1"
        )
        .to(
          ".can_img_2",
          { y: "-100%", duration: 1, ease: "back.out(-4)" },
          "step1"
        )
        .to(".svg2 path", { fill: "#C1570D", duration: 1 }, "step1")
        .to(".svg1 path", { fill: "#CF8038", duration: 1 }, "step1");

      // Step 2
      tl.addLabel("step2")
        .to(
          ".text_part",
          { yPercent: -36.8 * 2, ease: "power2.out", duration: 1.5 },
          "step2"
        )
        .to(
          ".can_img_2",
          { y: "100%", duration: 1, ease: "back.out(-4)" },
          "step2"
        )
        .to(
          ".can_img_3",
          { y: "-100%", duration: 1, ease: "back.out(-4)" },
          "step2"
        )
        .to(".svg1 path", { fill: "#CF4244", duration: 1 }, "step2")
        .to(".svg2 path", { fill: "#B71C18", duration: 1 }, "step2");
      tl.addLabel("step3");
      timelineRef.current = tl;

      return tl;
    },
    { scope: hero }
  );
  const handleNext = () => {
    if (!timelineRef.current) return;
    const tl = timelineRef.current;

    if (step === 0) {
      tl.tweenTo("step2");
      setStep(1);
    } else if (step === 1) {
      tl.tweenTo("step3");
      setStep(2);
    }
  };

  const handlePrev = () => {
    if (!timelineRef.current) return;
    const tl = timelineRef.current;

    if (step === 2) {
      tl.tweenTo("step2");
      setStep(1);
    } else if (step === 1) {
      tl.tweenTo("step1");
      setStep(0);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative" ref={hero}>
      <div className="svg_curve absolute bottom-0 left-0 w-full -z-1">
        <svg
          className="svg1"
          viewBox="0 0 1440 320"
          width="100%"
          height="40vh"
          preserveAspectRatio="none"
          style={{ position: "absolute", bottom: 0, left: 0 }}
        >
          <path
            fill="#58AD6F"
            d="M0,0 C480,160 960,160 1440,0 L1440,320 L0,320 Z"
          />
        </svg>
        <svg
          className="svg2"
          viewBox="0 0 1440 320"
          width="100%"
          height="36vh"
          preserveAspectRatio="none"
          style={{ position: "absolute", bottom: 0, left: 0 }}
        >
          <path
            fill="#3C7A4F"
            d="M0,0 C480,160 960,160 1440,0 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
      <div className="can_img_1 absolute flex justify-center items-center  h-full w-full z-1">
        <img
          src="/can/can.webp"
          alt="can"
          className="w-[90%] min-w-[600px] sm:w-4xl sm:min-w-none h-none sm:h-auto "
        />
      </div>
      <div className="can_img_2 absolute flex justify-center items-center top-full h-full w-full z-1">
        <img
          src="/can/can2.webp"
          alt="can"
          className="w-[90%] min-w-[600px] sm:w-4xl sm:min-w-none h-none sm:h-auto "
        />
      </div>
      <div className="can_img_3 absolute flex justify-center items-center top-full h-full w-full z-1">
        <img
          src="/can/can3.webp"
          alt="can"
          className="w-[90%] min-w-[600px] sm:w-4xl sm:min-w-none h-none sm:h-auto "
        />
      </div>
      <div className="text_part hidden  absolute sm:flex flex-col  items-center top-1/12 sm:top-1 w-full -z-2">
        {fruits.map((fruit) => {
          const colorClass =
            fruit === "lime"
              ? "text-[#CAD7A1]"
              : fruit === "orange"
              ? "text-orange-300"
              : fruit === "strawberry"
              ? "text-red-300"
              : "";
          return [...Array(5)].map((_, idx) => (
            <h1
              key={fruit + idx}
              className={`${
                fruit === "strawberry"
                  ? "text-7xl sm:text-[min(25vh,100vh)]"
                  : "text-9xl sm:text-[min(35vh,100vh)]"
              } leading-[0.9] ${
                anton.className
              } tracking-widest uppercase ${colorClass}`}
            >
              {fruit}
            </h1>
          ));
        })}
      </div>
      <div className="button absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-between px-10 z-10">
        <button
          className="p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition cursor-pointer"
          id="prevBtn"
          onClick={handlePrev}
        >
          <ArrowLeft size={40} color="white" />
        </button>

        <button
          className="p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition cursor-pointer"
          id="nextBtn"
          onClick={handleNext}
        >
          <ArrowRight size={40} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
