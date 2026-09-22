import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/content";
import { useLenis } from "./SmoothScroll";
import "./Hero.css";

const titleWords = hero.title.split(" ");

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  const handleOpen = () => {
    const target = document.getElementById("timeline");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section className="hero section" id="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="section__inner hero__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="hero__title glow-text">
          {titleWords.map((word, i) => (
            <motion.span
              key={word + i}
              className="hero__word"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}{" "}
            </motion.span>
          ))}
          <motion.span
            className="hero__heart"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "backOut" }}
          >
            {hero.titleSuffix}
          </motion.span>
        </h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.button
          type="button"
          className="hero__cta"
          onClick={handleOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          whileTap={{ scale: 0.96 }}
        >
          {hero.cta}
        </motion.button>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
