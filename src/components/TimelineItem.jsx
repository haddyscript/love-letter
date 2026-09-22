import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function TimelineItem({ event, index }) {
  const shouldReduceMotion = useReducedMotion();
  const side = index % 2 === 0 ? "left" : "right";
  const photoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start 0.88", "start 0.3"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

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
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="timeline__dot" aria-hidden="true" />

      <div className="timeline__card">
        {event.label && <span className="timeline__label">{event.label}</span>}
        {event.date && <span className="timeline__date">{event.date}</span>}
        <h3 className="timeline__title">{event.title}</h3>
        <p className="timeline__text">{event.text}</p>

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
