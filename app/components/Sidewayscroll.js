"use client";
import React, { use, useRef } from "react";
import Flav from "./flavors/Flav";
import { cans } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const Sidewayscroll = () => {
  const SideContainer = useRef(null);
  useGSAP(
    () => {
      if (typeof window === "undefined" || window.innerWidth <= 700) return;
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: SideContainer.current,
    start: "top 0%",
    end: "top -250%",
    scrub: 1,
    pin: true,
  },
});

tl.to({}, { duration: 0.01 }) 
  .to(SideContainer.current.querySelector(".slide"), {
    transform: "translateX(-65%)",
  });
    },
    { scope: SideContainer }
  );
  return (
    <div ref={SideContainer} className="bg-[#E0F2E3]">
      <div className="slide w-full sm:min-w-[250%] min-h-screen bg-[#E0F2E3] p-7 flex flex-col sm:flex-row items-stretch transform ">
        <div className="text_content min-h-full flex flex-col justify-center">
          <div className="relative text-center">
            <div
              className="font-extrabold leading-tight flex flex-col text-gray-900"
              style={{ fontFamily: "Antonio, sans-serif" }}
            >
              <div
                className="relative tracking-tighter z-20 text-[#1A3A2D] text-[clamp(2.5rem,8vw,4.5rem)] sm:text-[7.8vw] uppercase"
                style={{
                  letterSpacing: "-.35vw",
                  padding: "0 1.5vw 0",
                  fontFamily: "Antonio, sans-serif",
                  lineHeight: "9vw",
                  marginBottom: "-1.5vw",
                }}
              >
                WE HAVE 3
              </div>
              <div
                className="relative z-30 tracking-tighter bg-yellow-400 text-[#E0F2E3] font-black uppercase shrink-0 mx-auto text-[clamp(2.8rem,8vw,5rem)] sm:text-[7.8vw]"
                style={{
                  fontFamily: "Antonio, sans-serif",
                  transform: "rotate(-3deg)",
                  fontSize: "7.8vw",
                  letterSpacing: "-.35vw",
                  padding: "0 1.5vw 1vw",
                  lineHeight: "9vw",
                  outline: "8px solid #E0F2E3",
                  outlineOffset: "0px",
                }}
              >
                FREAKING
              </div>
              <div
                className="relative tracking-tighter z-20 text-[#1A3A2D] text-[clamp(2.5rem,8vw,4.5rem)] sm:text-[7.8vw] uppercase"
                style={{
                  letterSpacing: "-.35vw",
                  padding: "0 1.5vw 1vw",
                  fontFamily: "Antonio, sans-serif",
                  lineHeight: "9vw",
                  marginTop: "-1.5vw",
                }}
              >
                DELICIOUS FLAVORS
              </div>
            </div>
          </div>
        </div>
        <div className="image_content mt-8 md:mt-0 flex-1 h-full flex flex-col gap-y-4 sm:flex-row sm:gap-x-12 sm:gap-y-0 sm:items-center ml-0 sm:ml-9 sm:py-16 lg:py-24">
          {cans.map((item) => {
            return <Flav key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidewayscroll;
