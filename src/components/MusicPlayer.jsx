import { useEffect, useRef } from "react";

// Streams live from YouTube's own embedded player (not a bundled audio
// file) so nothing copyrighted is downloaded or redistributed by this site.
const YOUTUBE_VIDEO_ID = "e5t1XD950Us";

export default function MusicPlayer() {
  const playerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let player;
    let cancelled = false;

    function createPlayer() {
      if (cancelled) return;
      player = new window.YT.Player("music-player-frame", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          // Muted autoplay is allowed by every browser without a user
          // gesture, so the song is already playing under the splash —
          // the first tap/click anywhere just unmutes it (see below).
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: (e) => {
            e.target.playVideo();
          },
          onError: (e) => {
            console.warn("Background music unavailable (YouTube error code):", e.data);
          },
        },
      });
      playerRef.current = player;
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
    }

    const startOnGesture = () => {
      if (startedRef.current || !playerRef.current) return;
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
        startedRef.current = true;
      } catch {
        // Player not ready yet — the next gesture will retry.
      }
    };

    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((evt) => document.addEventListener(evt, startOnGesture));

    return () => {
      cancelled = true;
      events.forEach((evt) => document.removeEventListener(evt, startOnGesture));
      playerRef.current?.destroy?.();
    };
  }, []);

  return (
    <div
      id="music-player-frame"
      aria-hidden="true"
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
