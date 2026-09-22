import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { timelineEvents } from "../data/content";
import TimelineItem from "./TimelineItem";
import "./Timeline.css";

export default function Timeline() {
  const trackRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section className="timeline section" id="timeline">
      <div className="section__inner">
        <p className="eyebrow">Our story</p>
        <h2 className="timeline__heading glow-text">A timeline of us</h2>
        <p className="timeline__intro">Every month added another reason.</p>
      </div>

      <div className="timeline__track" ref={trackRef}>
        <div className="timeline__line-track" aria-hidden="true">
          <motion.div
            className="timeline__line-fill"
            style={
              shouldReduceMotion
                ? { scaleY: 1 }
                : { scaleY: lineProgress }
            }
          />
        </div>

        <ol className="timeline__list">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
