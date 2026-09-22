import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import "./FloatingParticles.css";

const GLYPHS = ["❤", "♥"];

function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 0.5 + Math.random() * 1.3,
    duration: 14 + Math.random() * 16,
    delay: -Math.random() * 24,
    drift: (Math.random() - 0.5) * 60,
    opacity: 0.15 + Math.random() * 0.35,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  }));
}

export default function FloatingParticles({ count = 26 }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => makeParticles(shouldReduceMotion ? 10 : count), [count, shouldReduceMotion]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particles__item ${shouldReduceMotion ? "particles__item--static" : ""}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
