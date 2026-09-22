import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./Splash.css";

const BURST_COUNT = 16;

function makeBurstHearts() {
  return Array.from({ length: BURST_COUNT }, (_, i) => {
    const angle = (360 / BURST_COUNT) * i + (Math.random() * 20 - 10);
    const distance = 130 + Math.random() * 110;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      tx: Math.cos(rad) * distance,
      ty: Math.sin(rad) * distance,
      size: 0.7 + Math.random() * 0.9,
      rotate: (Math.random() - 0.5) * 90,
      delay: Math.random() * 0.08,
    };
  });
}

export default function Splash({ onDone }) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!shouldReduceMotion);
  const [bursting, setBursting] = useState(false);
  const burstHearts = useMemo(() => makeBurstHearts(), []);

  useEffect(() => {
    if (shouldReduceMotion) {
      onDone?.();
      return undefined;
    }
    const burstTimer = setTimeout(() => setBursting(true), 2300);
    return () => clearTimeout(burstTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!bursting) return undefined;
    const hideTimer = setTimeout(() => setVisible(false), 750);
    return () => clearTimeout(hideTimer);
  }, [bursting]);

  const handleExitComplete = () => {
    onDone?.();
  };

  const handleSkip = () => setBursting(true);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="splash"
          role="presentation"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="splash__flash"
            initial={{ opacity: 0 }}
            animate={bursting ? { opacity: [0, 0.55, 0] } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.div
            className="splash__ring"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={
              bursting
                ? { scale: [1, 2.6], opacity: [0.7, 0] }
                : { scale: [0.4, 1.7], opacity: [0.6, 0] }
            }
            transition={
              bursting
                ? { duration: 0.7, ease: "easeOut" }
                : { duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.2 }
            }
          />

          {bursting &&
            burstHearts.map((h) => (
              <motion.span
                key={h.id}
                className="splash__burst-heart"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{ x: h.tx, y: h.ty, scale: h.size, opacity: 0, rotate: h.rotate }}
                transition={{ duration: 0.75, delay: h.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                ❤
              </motion.span>
            ))}

          <motion.span
            className="splash__heart"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              bursting
                ? { scale: [1.15, 1.6, 0.2], opacity: [1, 1, 0] }
                : { scale: [0.5, 1, 1.12, 1, 1.18, 1], opacity: 1 }
            }
            transition={
              bursting
                ? { duration: 0.55, ease: [0.4, 0, 1, 1] }
                : { duration: 1.9, times: [0, 0.3, 0.45, 0.6, 0.8, 1], repeat: Infinity, repeatDelay: 0.3, ease: "easeInOut" }
            }
          >
            ❤
          </motion.span>

          <AnimatePresence>
            {!bursting && (
              <motion.p
                className="splash__text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                opening our story...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
