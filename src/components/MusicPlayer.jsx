import { createContext, useContext, useEffect, useRef } from "react";

// Streams live from YouTube's own embedded player (not a bundled audio
// file) so nothing copyrighted is downloaded or redistributed by this site.
const YOUTUBE_VIDEO_ID = "e5t1XD950Us";

const MusicContext = createContext(null);

export function useMusic() {
  return useContext(MusicContext);
}

export default function MusicPlayer({ children }) {
  const playerRef = useRef(null);

  useEffect(() => {
    let player;
    let cancelled = false;

    function createPlayer() {
      if (cancelled) return;
      player = new window.YT.Player("music-player-frame", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: () => {
            playerRef.current = player;
          },
          onError: (e) => {
            console.warn("Background music unavailable (YouTube error code):", e.data);
          },
        },
      });
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

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
    };
  }, []);

  // Call this from a real click/tap handler — playing unmuted audio for
  // the first time only works inside a genuine user-gesture handler.
  const play = () => {
    try {
      playerRef.current?.playVideo?.();
    } catch {
      // Player not ready yet; nothing to do — user can trigger again.
    }
  };

  return (
    <MusicContext.Provider value={{ play }}>
      {children}
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
    </MusicContext.Provider>
  );
}
