// Custom hook for scroll-triggered animations using Intersection Observer
import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // animate only once
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

// Preset animation class builders
export const animClass = {
  fadeUp: (visible, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
  fadeLeft: (visible, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
    }`,
  fadeRight: (visible, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
    }`,
  scaleIn: (visible, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
      visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`,
};
