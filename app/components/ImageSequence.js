"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper functions
function remap(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function fitContent(
  containerWidth,
  containerHeight,
  contentWidth,
  contentHeight
) {
  const containerRatio = containerWidth / containerHeight;
  const contentRatio = contentWidth / contentHeight;

  let width, height, x, y;

  if (containerRatio > contentRatio) {
    width = containerWidth;
    height = containerWidth / contentRatio;
  } else {
    height = containerHeight;
    width = containerHeight * contentRatio;
  }

  x = (containerWidth - width) / 2;
  y = (containerHeight - height) / 2;

  return { x, y, width, height };
}

export default function Page() {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const quoteRef = useRef(null);
  const progress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Animate title characters on load
      const title = document.querySelector("h1");
      if (title) {
        const chars = title.textContent.split("");
        title.innerHTML = chars
          .map((char) => `<span class="inline-block">${char}</span>`)
          .join("");

        gsap.from("h1 span", {
          x: "100%",
          rotateY: "90deg",
          stagger: 0.02,
          duration: 0.5,
          ease: "circ.out",
        });
      }

      // Animate background quote horizontally from right to left
      gsap.fromTo(
        quoteRef.current,
        {
          x: "100%",
        },
        {
          x: "-100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
          },
        }
      );

      // Main scroll animation with pinning
      const tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 2,
          pin: true,
        //   pinSpacing: true,
        //   anticipatePin: 1,
        },
      });

      // Circle expands to cover entire screen
      tl.to(
        ".expand-circle",
        {
          scale: 150,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      )

        // Can animation
        .to(
          progress,
          {
            current: 1,
            duration: 1,
            ease: "none",
          },
          0
        )

        // Title fades
        .to(
          ".title",
          {
            autoAlpha: 0,
            duration: 0.05,
          },
          0.15
        );

      // Animate drink info 1
      tl.to(
        ".drink-info-1",
        {
          autoAlpha: 1,
          duration: 0.08,
        },
        0.25
      )
        .to(
          ".drink-info-1 .info-text",
          {
            x: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.25
        )
        .to(
          ".drink-info-1 .info-line",
          {
            scaleX: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.25
        )
        .to(
          ".drink-info-1",
          {
            autoAlpha: 0,
            duration: 0.05,
          },
          0.45
        );

      // Animate drink info 2
      tl.to(
        ".drink-info-2",
        {
          autoAlpha: 1,
          duration: 0.08,
        },
        0.5
      )
        .to(
          ".drink-info-2 .info-text",
          {
            x: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.5
        )
        .to(
          ".drink-info-2 .info-line",
          {
            scaleX: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.5
        )
        .to(
          ".drink-info-2",
          {
            autoAlpha: 0,
            duration: 0.05,
          },
          0.7
        );

      // Animate drink info 3
      tl.to(
        ".drink-info-3",
        {
          autoAlpha: 1,
          duration: 0.08,
        },
        0.75
      )
        .to(
          ".drink-info-3 .info-text",
          {
            x: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.75
        )
        .to(
          ".drink-info-3 .info-line",
          {
            scaleX: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.75
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="relative bg-[#B9F8CF] min-h-screen">
        <div className="relative h-screen w-full overflow-hidden flex justify-center items-center ">
          {/* Full background image - centered */}
          <div className="absolute inset-0">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/can/can.webp"
                alt="Lime Fresh Can"
                className="max-h-[70%] max-w-full object-contain absolute top-1/2 left-1/2 translate-y-[50%] scale-200"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-[#B9F8CF]/40" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 pb-12">
            {/* Info cards - circular design */}
            <div className="space-y-4 w-full max-w-md flex flex-col items-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-1">
                      85
                    </h3>
                    <p className="text-[11px] font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                      Calories
                    </p>
                    <p className="text-[9px] text-[#1A3A2D]/60 mt-0.5">
                      per can
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-1">
                      0g
                    </h3>
                    <p className="text-[11px] font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                      Sugar
                    </p>
                    <p className="text-[9px] text-[#1A3A2D]/60 mt-0.5">
                      zero guilt
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-1">
                      B12
                    </h3>
                    <p className="text-[11px] font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                      Vitamins
                    </p>
                    <p className="text-[9px] text-[#1A3A2D]/60 mt-0.5">
                      energy boost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-[#1a1a1a]">
      <div
        ref={canvasContainerRef}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Expanding Circle - Behind everything */}
        <div className="expand-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#B9F8CF] pointer-events-none z-0"></div>

        {/* Background Quote */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden z-10">
          <h2
            ref={quoteRef}
            className="text-[15vw] font-black text-[#1A3A2D] whitespace-nowrap leading-none tracking-wider"
            style={{ fontFamily: "Antonio, sans-serif" }}
          >
            DRINK THE WAY YOU LIKE
          </h2>
        </div>

        {/* Canvas with can - In middle */}
        <div className="absolute inset-0 z-20">
          <ImageSequence progress={progress} />
        </div>

        <div className="absolute inset-0 pointer-events-none z-30">
          <section className="title absolute inset-0 flex items-end justify-center pb-12">
            <h1 className="uppercase text-[8vw] leading-none tracking-widest text-transparent font-black drop-shadow-lg">
              LIME FRESH
            </h1>
          </section>

          {/* Drink Info 1 */}
          <section className="drink-info-1 absolute inset-0 opacity-0">
            <div className="absolute top-[25%] right-[15%]">
              <div className="info-text opacity-0 translate-x-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-2">
                        85
                      </h3>
                      <p className="text-xs font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                        Calories
                      </p>
                      <p className="text-[10px] text-[#1A3A2D]/60 mt-1">
                        per can
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-line absolute top-1/2 -translate-y-1/2 right-full w-40 h-[3px] bg-white/40 origin-right scale-x-0"></div>
            </div>
          </section>

          {/* Drink Info 2 */}
          <section className="drink-info-2 absolute inset-0 opacity-0">
            <div className="absolute top-[50%] -translate-y-1/2 left-[15%]">
              <div className="info-text opacity-0 -translate-x-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-2">
                        0g
                      </h3>
                      <p className="text-xs font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                        Sugar
                      </p>
                      <p className="text-[10px] text-[#1A3A2D]/60 mt-1">
                        zero guilt
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-line absolute top-1/2 -translate-y-1/2 left-full w-40 h-[3px] bg-white/40 origin-left scale-x-0"></div>
            </div>
          </section>

          {/* Drink Info 3 */}
          <section className="drink-info-3 absolute inset-0 opacity-0">
            <div className="absolute bottom-[20%] right-[15%]">
              <div className="info-text opacity-0 translate-x-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute inset-2 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <h3 className="text-4xl font-black text-[#1A3A2D] leading-none mb-2">
                        B12
                      </h3>
                      <p className="text-xs font-bold text-[#1A3A2D]/80 tracking-wider uppercase">
                        Vitamins
                      </p>
                      <p className="text-[10px] text-[#1A3A2D]/60 mt-1">
                        energy boost
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-line absolute top-1/2 -translate-y-1/2 right-full w-40 h-[3px] bg-white/40 origin-right scale-x-0"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


