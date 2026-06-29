import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";

interface AnimatedCounterProps {
  value: number;
  direction?: "up" | "down";
  format?: (value: number) => string;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({
  value,
  direction = "up",
  format = (v) => Math.round(v).toString(),
  className = "",
  delay = 0,
}: AnimatedCounterProps) {
  const { demoMode } = useUIStore();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(direction === "down" ? value + 100 : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: demoMode ? 3 : 1.5,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, value, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = format(latest);
      }
    });
  }, [springValue, format]);

  return <motion.span ref={ref} className={className} />;
}
