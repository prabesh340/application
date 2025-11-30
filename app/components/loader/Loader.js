"use client";
import React, { useRef, useEffect, useState } from "react";

export default function Loader({ children }) {
  const loader = useRef(null);
  const path = useRef(null);
  const progressFill = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const initialCurve = 200;
  const duration = 600;
  let start;
  let loaderHeightCache = null;

  useEffect(() => {
    // Cache height immediately
    if (loader.current) {
      loaderHeightCache = loader.current.offsetHeight;
    }
    
    setPath(initialCurve);

    // Start curve animation after delay
    const timer = setTimeout(() => {
      if (loader.current) {
        loader.current.style.backgroundColor = "transparent";
        requestAnimationFrame(animate);
      }
    }, 1200);

    return () => clearTimeout(timer);

    return () => {
      loaderHeightCache = null;
    };
  }, []);

  const animate = (timestamp) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    setPath(newCurve);
    
    if (loader.current && loaderHeightCache) {
      const translateY = easeOutQuad(elapsed, 0, -loaderHeightCache, duration);
      loader.current.style.transform = `translateY(${translateY}px)`;
    }
    
    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      setIsComplete(true);
    }
  };

  const easeOutQuad = (time, start, end, duration) => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const setPath = (curve) => {
    const width = window.innerWidth;
    const height = loaderHeightCache || (loader.current ? loader.current.offsetHeight : window.innerHeight + 200);
    
    if (path.current) {
      path.current.setAttribute(
        "d",
        `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - curve} 0 ${height} L0 0`
      );
    }
  };

  // Debounced resize handler
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (loader.current) {
          loaderHeightCache = loader.current.offsetHeight;
          setPath(initialCurve);
        }
      }, 150);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div ref={loader} style={styles.loader}>
      <svg style={styles.svg}>
        <path ref={path} style={styles.path}></path>
      </svg>
      <div style={styles.loaderContent}>
        <img 
          src="/LEXI_LOADING.webp" 
          alt="LEXI Logo" 
          style={styles.logo}
          loading="eager"
          decoding="async"
        />
      </div>
      <style jsx>{`
        [data-progress]::before {
          content: attr(data-progress);
        }
        .progress-value {
          display: none;
        }
      `}</style>
    </div>
  );
}

const styles = {
  loader: {
    height: "calc(100vh + 200px)",
    width: "100%",
    position: "fixed",
    zIndex: 10000,
    backgroundColor: "#254726",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    willChange: "transform",
  },
  loaderContent: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10001,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(2rem, 5vw, 3rem)",
    padding: "1rem",
    width: "90%",
    maxWidth: "500px",
  },
  logo: {
    width: "100%",
    maxWidth: "clamp(150px, 40vw, 170px)",
    height: "auto",
    display: "block",
    margin: "0 auto",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(0.75rem, 2vw, 1rem)",
    width: "100%",
    maxWidth: "clamp(250px, 70vw, 350px)",
    margin: "0 auto",
  },
  progressText: {
    fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "system-ui, -apple-system, sans-serif",
    letterSpacing: "0.05em",
  },
  progressBar: {
    width: "100%",
    height: "clamp(6px, 1.5vw, 8px)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: "100px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #ffffff, #f0f0f0)",
    borderRadius: "100px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    transformOrigin: "left",
    transform: "scaleX(0)",
    willChange: "transform",
  },
  svg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  path: {
    fill: "#254726",
  },
};