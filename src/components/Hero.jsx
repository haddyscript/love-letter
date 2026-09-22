import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/content";
import { useLenis } from "./SmoothScroll";
import { useMusic } from "./MusicPlayer";
import CountUp from "./CountUp";
import "./Hero.css";

const titleWords = hero.title.split(" ");

// Update this alongside the "59" mentioned elsewhere on the site (title,
// final countdown) if the number of months changes.
const MONTHS = 59;
const DAYS = Math.round(MONTHS * 30.44);
const HOURS = DAYS * 24;

const stats = [
  { label: "Hours", value: HOURS },
  { label: "Days", value: DAYS },
  { label: "Months", value: MONTHS },
];

function splitLeadingNumber(word) {
  const match = word.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

function splitNumber(text) {
  const match = text.match(/\d+/);
  if (!match) return null;
  return {
    before: text.slice(0, match.index),
    number: parseInt(match[0], 10),
    after: text.slice(match.index + match[0].length),
  };
}

const subtitleParts = splitNumber(hero.subtitle);

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

    // Every scroll-linked animation mounted before this click (e.g.
    // FinalMessage's useScroll) measured the document while it was still
    // artificially shrunk to viewport height by the lock above, and caches
    // that measurement — a resize event is the standard nudge these
    // libraries listen for to remeasure against the now-correct, full
    // document height.
    window.dispatchEvent(new Event("resize"));

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
          {titleWords.map((word, i) => {
            const numeric = splitLeadingNumber(word);
            return (
              <motion.span
                key={word + i}
                className="hero__word"
                initial={{ opacity: 0, y: 24 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {numeric ? (
                  <>
                    <CountUp to={numeric.number} start={ready} duration={2.6} delay={0.35} />
                    {numeric.suffix}
                  </>
                ) : (
                  word
                )}
              </motion.span>
            );
          })}
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
          {subtitleParts ? (
            <>
              {subtitleParts.before}
              <CountUp to={subtitleParts.number} start={ready} duration={2} delay={1.7} />
              {subtitleParts.after}
            </>
          ) : (
            hero.subtitle
          )}
        </motion.p>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 1.7 }}
        >
          {stats.map((stat, i) => (
            <div className="hero__stat" key={stat.label}>
              <span className="hero__stat-value">
                <CountUp to={stat.value} start={ready} duration={3.2} delay={2 + i * 0.25} />
              </span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          className="hero__cta"
          onClick={handleOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 2.3 }}
          whileTap={{ scale: 0.96 }}
        >
          {hero.cta}
        </motion.button>
      </div>
    </section>
  );
}
