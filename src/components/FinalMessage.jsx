import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { finalMessage } from "../data/content";
import roseAccent from "../assets/photos/flower-photo.jpg";
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

  // Tracks the whole page's scroll position (scrollY / maxScrollY) instead
  // of this section's own on-screen position. As the last section on the
  // page, position-based tracking has no margin for error — any stale
  // measurement (e.g. from mounting while the pre-click scroll lock had
  // temporarily shrunk the document) leaves it permanently stuck. Global
  // scroll fraction is simple and self-correcting: it's always current.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  // Compressed well below 1 with a comfortable margin — the achievable
  // maximum for the page's overall scroll fraction varies by device/
  // content height and doesn't reliably reach exactly 1.0 in practice.
  const countdown = useBlockStyle(progress, [0.5, 0.58]);
  const heading = useBlockStyle(progress, [0.56, 0.64]);
  const body = useBlockStyle(progress, [0.62, 0.7]);
  const closing = useBlockStyle(progress, [0.68, 0.76]);
  const signature = useBlockStyle(progress, [0.74, 0.82]);

  const closingGlowOpacity = useTransform(progress, [0.68, 0.76], [0, 1]);

  const style = (block) => (shouldReduceMotion ? undefined : block);

  return (
    <section className="final section" id="final">
      <div className="final__glow" aria-hidden="true" />
      <img className="final__rose" src={roseAccent} alt="" aria-hidden="true" />
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
