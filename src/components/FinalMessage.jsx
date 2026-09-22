import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { finalMessage } from "../data/content";
import "./FinalMessage.css";

function useBlockStyle(progress, range) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [34, 0]);
  const blurPx = useTransform(progress, range, [10, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  return { opacity, y, filter };
}

export default function FinalMessage() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const countdown = useBlockStyle(progress, [0.05, 0.25]);
  const heading = useBlockStyle(progress, [0.15, 0.35]);
  const body = useBlockStyle(progress, [0.25, 0.45]);
  const closing = useBlockStyle(progress, [0.38, 0.58]);
  const signature = useBlockStyle(progress, [0.5, 0.7]);

  const closingGlowOpacity = useTransform(progress, [0.38, 0.58], [0, 1]);

  const style = (block) => (shouldReduceMotion ? undefined : block);

  return (
    <section className="final section" id="final" ref={sectionRef}>
      <div className="final__glow" aria-hidden="true" />
      <div className="section__inner final__inner">
        <motion.div className="final__countdown" style={style(countdown)}>
          {finalMessage.countdown.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>

        <motion.h2 className="final__heading glow-text" style={style(heading)}>
          {finalMessage.heading}
        </motion.h2>

        <motion.p className="final__body" style={style(body)}>
          {finalMessage.body}
        </motion.p>

        <motion.div className="final__closing-wrap" style={style(closing)}>
          <motion.span
            className="final__closing-glow"
            aria-hidden="true"
            style={shouldReduceMotion ? undefined : { opacity: closingGlowOpacity }}
            animate={shouldReduceMotion ? {} : { scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="final__closing">{finalMessage.closing}</p>
        </motion.div>

        <motion.p className="final__signature" style={style(signature)}>
          {finalMessage.signature}
        </motion.p>
      </div>
    </section>
  );
}
