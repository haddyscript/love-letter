import { useEffect } from "react";
import { useLenis } from "./SmoothScroll";

// Lenis drives scroll imperatively (window.scrollTo in its raf loop), so
// CSS `overflow: hidden` alone doesn't stop it — it has to be told to stop.
export default function LenisLock({ locked }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, locked]);

  return null;
}
