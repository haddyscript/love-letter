import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/content";
import { useLenis } from "./SmoothScroll";
import { useMusic } from "./MusicPlayer";
import "./Hero.css";

const titleWords = hero.title.split(" ");

export default function Hero({ ready = true, onOpen }) {
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();
  const music = useMusic();

  const handleOpen = () => {
    const target = document.getElementById("timeline");

    // Unlock scroll immediately (synchronously) rather than waiting on the
    // parent's state update, so the animated scroll below isn't blocked by
    // the still-applied lock styles. The lock pins <body> with
    // position:fixed + a negative top offset (the iOS-reliable technique),
    // so undoing it means restoring scroll to that offset before clearing
    // the fixed positioning, or the page would jump to the top first.
    const lockedOffset = -(parseInt(document.body.style.top || "0", 10) || 0);
    document.documentElement.style.overflow = "";
    document.documentElement.style.touchAction = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    window.scrollTo(0, lockedOffset);
    onOpen?.();
    music?.play();

    if (!target) return;
    if (lenis) {
      lenis.start();
      // The lock temporarily shrinks the document to viewport height
      // (position:fixed body), so Lenis's cached scroll limit is now
      // stale — force it to remeasure before animating, or the target
      // offset gets clamped to the old (too-small) limit.
      lenis.resize();
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section className="hero section" id="hero">
      <motion.div
        className="hero__glow"
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="section__inner hero__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="hero__title glow-text">
          {titleWords.map((word, i) => (
            <motion.span
              key={word + i}
              className="hero__word"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            className="hero__heart"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.6, delay: 1, ease: "backOut" }}
          >
            {hero.titleSuffix}
          </motion.span>
        </h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.button
          type="button"
          className="hero__cta"
          onClick={handleOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          whileTap={{ scale: 0.96 }}
        >
          {hero.cta}
        </motion.button>
      </div>
    </section>
  );
}
