import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

// Deliberately slow — a hard, fast swipe and a light, gentle one both
// settle into this same cruise speed, so scroll pace stays calm and
// unhurried (in step with the background music) regardless of effort.
const CRUISE_SPEED = 260; // px/second
const ACCEL = 3.2; // how quickly velocity eases toward the cruise speed
const IDLE_RESET_MS = 140; // gesture is considered "released" after this gap

export default function ConstantScroll({ locked }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (locked || shouldReduceMotion) return undefined;

    let direction = 0;
    let velocity = 0;
    let touchLastY = null;
    let idleTimer;
    let rafId;
    let lastTime = performance.now();

    const setDirection = (dir) => {
      direction = dir;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        direction = 0;
      }, IDLE_RESET_MS);
    };

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      // Belt-and-suspenders: Lenis's touchMultiplier is zeroed (see
      // SmoothScroll) so it shouldn't react to touch at all, but stopping
      // propagation here means its listener never even sees the gesture.
      e.stopPropagation();
      touchLastY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
      e.stopPropagation();
      const y = e.touches[0].clientY;
      if (touchLastY !== null) {
        const dy = touchLastY - y; // finger moving up = content scrolls down
        if (Math.abs(dy) > 1) setDirection(Math.sign(dy));
      }
      touchLastY = y;
    };

    const onTouchEnd = (e) => {
      e.stopPropagation();
      touchLastY = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const targetVelocity = direction * CRUISE_SPEED;
      velocity += (targetVelocity - velocity) * Math.min(ACCEL * dt, 1);

      if (Math.abs(velocity) > 0.5) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const next = Math.max(0, Math.min(maxScroll, window.scrollY + velocity * dt));
        window.scrollTo(0, next);
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [locked, shouldReduceMotion]);

  return null;
}
