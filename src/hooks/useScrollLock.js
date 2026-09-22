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
    };

    html.style.overflow = "hidden";
    html.style.touchAction = "none";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.touchAction = prev.htmlTouchAction;
      body.style.overflow = prev.bodyOverflow;
      body.style.touchAction = prev.bodyTouchAction;
    };
  }, [locked]);
}
