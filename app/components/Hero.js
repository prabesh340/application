import Image from "next/image";
import React from "react";
import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});
const Hero = () => {
  return (
    <div className="h-screen w-full  relative overflow-hidden">
      <div className="svg_curve absolute bottom-0 left-0 w-full -z-1">
        <svg
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
      <div className="can_img flex justify-center items-center h-full w-full z-1">
        <img src="/can.webp" alt="can" className="w-[90%] min-w-[600px] sm:w-4xl sm:min-w-none h-none sm:h-auto " />
      </div>
      <div className="text_part  absolute flex flex-col  items-center top-1/12 sm:top-1 w-full -z-2">
        {[...Array(5)].map((_, idx) => {
          return (
            <h1 key={idx} className={`text-9xl sm:text-[min(35vh,100vh)] leading-[0.9] ${anton.className} tracking-widest uppercase text-[#CAD7A1]`}>
              lime
            </h1>
          );
        })}
        {/* <h1 className="text-9xl">LIME</h1> */}
      </div>
    </div>
  );
};
 
export default Hero;
