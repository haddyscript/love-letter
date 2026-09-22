import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function TimelineItem({ event, index }) {
  const shouldReduceMotion = useReducedMotion();
  const side = index % 2 === 0 ? "left" : "right";
  const cardRef = useRef(null);
  const photoRef = useRef(null);

  // Drives the card container + text cascade — triggers as the card's top
  // edge enters, well before the photo (near the card's bottom) does.
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start 0.92", "start 0.42"],
  });
  const cardProgress = useSpring(cardScroll, { stiffness: 90, damping: 24, mass: 0.4 });

  const cardOpacity = useTransform(cardProgress, [0, 0.5], [0, 1]);
  const cardScale = useTransform(cardProgress, [0, 0.6], [0.94, 1]);
  const cardBlurPx = useTransform(cardProgress, [0, 0.5], [10, 0]);
  const cardFilter = useTransform(cardBlurPx, (v) => `blur(${v}px)`);
  const cardRotateX = useTransform(cardProgress, [0, 0.6], [10, 0]);
  const irisOpacity = useTransform(cardProgress, [0.05, 0.55], [1, 0]);

  const useStaggerStyle = (range) => ({
    opacity: useTransform(cardProgress, range, [0, 1]),
    y: useTransform(cardProgress, range, [16, 0]),
  });
  const labelStyle = useStaggerStyle([0.05, 0.3]);
  const titleStyle = useStaggerStyle([0.15, 0.42]);
  const textStyle = useStaggerStyle([0.25, 0.55]);

  // Drives the photo's own 3D settle, independent of (and later than) the
  // card cascade above — same as before.
  const { scrollYProgress: photoScroll } = useScroll({
    target: photoRef,
    offset: ["start 0.88", "start 0.3"],
  });
  const progress = useSpring(photoScroll, { stiffness: 100, damping: 24, mass: 0.4 });

  const scale = useTransform(progress, [0, 1], [1.15, 1]);
  const imageOpacity = useTransform(progress, [0, 1], [0.3, 1]);
  const y = useTransform(progress, [0, 1], [36, 0]);
  const rotateX = useTransform(progress, [0, 1], [24, 0]);
  const rotateY = useTransform(progress, [0, 1], [side === "left" ? -18 : 18, 0]);
  const saturate = useTransform(progress, [0, 1], [0.4, 1]);
  const filter = useTransform(saturate, (v) => `saturate(${v})`);

  return (
    <motion.li
      className={`timeline__item timeline__item--${side}`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="timeline__dot" aria-hidden="true" />

      <div
        className="timeline__card"
        ref={cardRef}
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: cardOpacity, scale: cardScale, rotateX: cardRotateX, filter: cardFilter }
        }
      >
        {!shouldReduceMotion && (
          <motion.span className="timeline__iris" aria-hidden="true" style={{ opacity: irisOpacity }} />
        )}

        {event.label && (
          <motion.span
            className="timeline__label"
            style={shouldReduceMotion ? undefined : labelStyle}
          >
            {event.label}
          </motion.span>
        )}
        {event.date && <span className="timeline__date">{event.date}</span>}
        <motion.h3 className="timeline__title" style={shouldReduceMotion ? undefined : titleStyle}>
          {event.title}
        </motion.h3>
        <motion.p className="timeline__text" style={shouldReduceMotion ? undefined : textStyle}>
          {event.text}
        </motion.p>

        {event.photo ? (
          <div className="timeline__photo-frame" ref={photoRef}>
            <motion.img
              className="timeline__photo"
              src={event.photo}
              alt={event.title}
              loading="lazy"
              style={
                shouldReduceMotion
                  ? undefined
                  : { scale, opacity: imageOpacity, y, rotateX, rotateY, filter }
              }
            />
          </div>
        ) : (
          <div className="timeline__photo timeline__photo--placeholder" aria-hidden="true" ref={photoRef}>
            <span>♥</span>
          </div>
        )}
      </div>
    </motion.li>
  );
}
