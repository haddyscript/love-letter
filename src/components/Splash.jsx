import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./Splash.css";

export default function Splash({ onDone }) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      onDone?.();
      return undefined;
    }

    const timer = setTimeout(() => setVisible(false), 2100);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion]);

  const handleExitComplete = () => {
    onDone?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="splash"
          role="presentation"
          onClick={() => setVisible(false)}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="splash__ring"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.2 }}
          />

          <motion.span
            className="splash__heart"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.12, 1], opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            ❤
          </motion.span>

          <motion.p
            className="splash__text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            opening our story...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
