import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import introHeartVideo from "../assets/photos/intro-heart-vid.mp4";
import "./Splash.css";

export default function Splash({ onDone }) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion]);

  const handleExitComplete = () => {
    onDone?.();
  };

  const handleSkip = () => setVisible(false);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="splash"
          role="presentation"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            className="splash__video"
            src={introHeartVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleSkip}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
