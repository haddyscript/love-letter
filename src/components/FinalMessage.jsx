import { motion, useReducedMotion } from "framer-motion";
import { finalMessage } from "../data/content";
import "./FinalMessage.css";

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function FinalMessage() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

  return (
    <section className="final section" id="final">
      <div className="final__glow" aria-hidden="true" />
      <motion.div
        className="section__inner final__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.55 }}
      >
        <div className="final__countdown">
          {finalMessage.countdown.map((line) => (
            <motion.p key={line} variants={variants} transition={{ duration: 1.1, ease: "easeOut" }}>
              {line}
            </motion.p>
          ))}
        </div>

        <motion.h2
          className="final__heading glow-text"
          variants={variants}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {finalMessage.heading}
        </motion.h2>

        <motion.p className="final__body" variants={variants} transition={{ duration: 1.2, ease: "easeOut" }}>
          {finalMessage.body}
        </motion.p>

        <motion.div className="final__closing-wrap" variants={variants} transition={{ duration: 1.3, ease: "easeOut" }}>
          <motion.span
            className="final__closing-glow"
            aria-hidden="true"
            animate={shouldReduceMotion ? {} : { opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="final__closing">{finalMessage.closing}</p>
        </motion.div>

        <motion.p className="final__signature" variants={variants} transition={{ duration: 1.2, ease: "easeOut" }}>
          {finalMessage.signature}
        </motion.p>
      </motion.div>
    </section>
  );
}
