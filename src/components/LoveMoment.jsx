import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loveMoment } from "../data/content";
import "./LoveMoment.css";

const BURST_COUNT = 10;

function makeBurst() {
  return Array.from({ length: BURST_COUNT }, (_, i) => {
    const angle = (360 / BURST_COUNT) * i + (Math.random() * 16 - 8);
    const distance = 46 + Math.random() * 34;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      tx: Math.cos(rad) * distance,
      ty: Math.sin(rad) * distance,
      size: 0.45 + Math.random() * 0.45,
      delay: Math.random() * 0.06,
    };
  });
}

export default function LoveMoment() {
  const [revealed, setRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const burst = useMemo(() => makeBurst(), []);

  return (
    <section className="love section" id="love">
      <div className="section__inner love__inner">
        <AnimatePresence mode="wait">
          {!revealed && (
            <motion.p
              key="prompt"
              className="love__prompt"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {loveMoment.heading}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          className="love__heart-button"
          onClick={() => setRevealed(true)}
          aria-label="Reveal a message"
          aria-expanded={revealed}
          animate={
            shouldReduceMotion
              ? {}
              : revealed
              ? { scale: 1 }
              : { scale: [1, 1.08, 1] }
          }
          transition={
            revealed
              ? { duration: 0.6, ease: "backOut" }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
          whileTap={{ scale: 0.88 }}
        >
          <span className="love__heart-glow" aria-hidden="true" />

          {!revealed && !shouldReduceMotion && (
            <>
              <motion.span
                className="love__ripple"
                aria-hidden="true"
                animate={{ scale: [1, 2.3], opacity: [0.55, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="love__ripple"
                aria-hidden="true"
                animate={{ scale: [1, 2.3], opacity: [0.55, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
              />
            </>
          )}

          {revealed &&
            !shouldReduceMotion &&
            burst.map((h) => (
              <motion.span
                key={h.id}
                className="love__burst-heart"
                aria-hidden="true"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: h.tx, y: h.ty, scale: h.size, opacity: 0 }}
                transition={{ duration: 0.7, delay: h.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                ❤
              </motion.span>
            ))}

          <motion.svg
            className="love__heart-svg"
            viewBox="0 0 32 29"
            animate={revealed ? { scale: 1.35 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <path
              d="M16 28.5C16 28.5 1 19.2 1 9.2C1 4.1 5 1 9.1 1C12.3 1 14.8 3 16 5.6C17.2 3 19.7 1 22.9 1C27 1 31 4.1 31 9.2C31 19.2 16 28.5 16 28.5Z"
              fill="url(#heartGradient)"
            />
            <defs>
              <linearGradient id="heartGradient" x1="1" y1="1" x2="31" y2="28.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff8fa3" />
                <stop offset="1" stopColor="#e8395a" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.button>

        <div className="love__lines" role="status">
          <AnimatePresence>
            {revealed &&
              loveMoment.lines.map((line, i) => (
                <motion.p
                  key={line}
                  className={`love__line ${i === loveMoment.lines.length - 1 ? "love__line--last" : ""}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.5 + i * 0.9, ease: "easeOut" }}
                >
                  {line}
                </motion.p>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
