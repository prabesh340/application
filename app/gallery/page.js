"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import { Antonio } from "next/font/google";
import Fottor from "../components/Fottor";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const images = [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "7.webp",
  "6.webp",
  "7.webp",
  "6.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
];

export default function Home() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis({ syncTouch: true });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* Enhanced Top Spacer with Lime Theme */}
      <div
        className={`${styles.spacer} relative flex flex-col items-center justify-center py-28overflow-hidden`}
      >
        <h1
          className={`${antonio.className} text-7xl font-bold bg-linear-to-r from-lime-600 to-green-700 bg-clip-text text-transparent mb-6`}
        >
          GALLERY
        </h1>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-lime-700 text-sm opacity-70">
            Scroll to Explore
          </div>
          <div className="w-6 h-10 border-2 border-lime-600 rounded-full mx-auto mt-2 flex justify-center">
            <div className="w-1 h-3 bg-lime-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Gallery Columns */}
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      {/* Enhanced Bottom Spacer with Lime Theme */}
      <div
        className={` relative flex max-h-screen flex-col items-center justify-center py-24`}
      >
        <div className="text-center z-10 max-w-4xl mx-auto">
          <h2
            className={`${antonio.className} text-5xl font-bold text-lime-800 mb-8`}
          >
            Fresh Perspectives
          </h2>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Where vibrant energy meets creative expression. Our lime-inspired
            gallery continues to evolve, bringing you the freshest visual
            experiences in digital art.
          </p>
        </div>
      </div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image src={`/images/${src}`} alt="image" fill />
          </div>
        );
      })}
    </motion.div>
  );
};
