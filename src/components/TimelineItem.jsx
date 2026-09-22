import { motion, useReducedMotion } from "framer-motion";

export default function TimelineItem({ event, index }) {
  const shouldReduceMotion = useReducedMotion();
  const side = index % 2 === 0 ? "left" : "right";

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
          <img className="timeline__photo" src={event.photo} alt={event.title} loading="lazy" />
        ) : (
          <div className="timeline__photo timeline__photo--placeholder" aria-hidden="true">
            <span>♥</span>
          </div>
        )}
      </div>
    </motion.li>
  );
}
