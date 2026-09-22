import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

export default function CountUp({ to, duration = 1.8, delay = 0, start = true, format }) {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const formatFn = format || ((n) => Math.round(n).toLocaleString());
  const display = useTransform(count, (v) => formatFn(v));

  useEffect(() => {
    if (!start) return undefined;
    if (shouldReduceMotion) {
      count.set(to);
      return undefined;
    }
    const controls = animate(count, to, { duration, delay, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [start, to, duration, delay, shouldReduceMotion, count]);

  return <motion.span>{display}</motion.span>;
}
