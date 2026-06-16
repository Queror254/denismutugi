"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: { Player: new (id: string, config: object) => any };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function HeroVideoA({ videoId }: { videoId: string }) {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const init = () => {
      playerRef.current = new window.YT.Player("hero-yt-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          vq: "hd1080",
        },
        events: {
          onReady: (e: any) => {
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
            // Seek back 1.5 s before the end so the loop never hits YouTube's
            // end-of-video loading screen.
            intervalRef.current = setInterval(() => {
              const p = playerRef.current;
              if (!p?.getCurrentTime) return;
              const t = p.getCurrentTime();
              const d = p.getDuration();
              if (d > 0 && t >= d - 1.5) p.seekTo(0, true);
            }, 500);
          },
          onStateChange: (e: any) => {
            // 1 = playing — fade out the black cover once video is live
            if (e.data === 1) setPlaying(true);
          },
        },
      });
    };

    if (window.YT?.Player) {
      init();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        init();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [videoId]);

  return (
    <>
      {/* Player mount point — YT API replaces this div with an iframe */}
      <div id="hero-yt-player" className="h-full w-full" />

      {/* Blocks all YouTube UI from being interacted with or seen */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Hides the initial loading state; fades out once playing */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
