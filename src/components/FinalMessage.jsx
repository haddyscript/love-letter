import { motion, useReducedMotion } from "framer-motion";
import { finalMessage } from "../data/content";
import "./FinalMessage.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function FinalMessage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="final section" id="final">
      <div className="final__glow" aria-hidden="true" />
      <motion.div
        className="section__inner final__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div className="final__countdown">
          {finalMessage.countdown.map((line) => (
            <motion.p key={line} variants={fadeUp} transition={{ duration: 0.8 }}>
              {line}
            </motion.p>
          ))}
        </div>

        <motion.h2
          className="final__heading glow-text"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
        >
          {finalMessage.heading}
        </motion.h2>

        <motion.p className="final__body" variants={fadeUp} transition={{ duration: 0.9 }}>
          {finalMessage.body}
        </motion.p>

        <motion.p className="final__closing" variants={fadeUp} transition={{ duration: 0.9 }}>
          {finalMessage.closing}
        </motion.p>

        <motion.p className="final__signature" variants={fadeUp} transition={{ duration: 0.9 }}>
          {finalMessage.signature}
        </motion.p>
      </motion.div>
    </section>
  );
}
