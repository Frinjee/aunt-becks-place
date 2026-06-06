"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

type RevealStyle = CSSProperties & {
  readonly "--i"?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--i": delay } as RevealStyle}>
      {children}
    </div>
  );
}
