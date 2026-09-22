import { useEffect } from "react";

export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      htmlTouchAction: html.style.touchAction,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
      bodyPosition: body.style.position,
      bodyWidth: body.style.width,
      scrollY: window.scrollY,
    };

    html.style.overflow = "hidden";
    html.style.touchAction = "none";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    // Pinning body via position:fixed is the one technique that reliably
    // blocks iOS Safari's touch-drag scroll/rubber-band even when a device
    // emulator's synthetic touch events don't fully honor touch-action.
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = `-${prev.scrollY}px`;

    // Belt-and-suspenders: explicitly block the gesture events themselves,
    // since some embedded/emulated browsers don't fully respect the CSS
    // above.
    const preventDefault = (e) => e.preventDefault();
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.touchAction = prev.htmlTouchAction;
      body.style.overflow = prev.bodyOverflow;
      body.style.touchAction = prev.bodyTouchAction;
      body.style.position = prev.bodyPosition;
      body.style.width = prev.bodyWidth;
      body.style.top = "";
      window.scrollTo(0, prev.scrollY);
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [locked]);
}
