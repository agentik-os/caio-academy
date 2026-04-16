"use client";

import * as React from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Props = {
  src: string;
  variant?: "inline" | "full";
  initialDuration?: number;
};

export function PodcastPlayer({ src, variant = "inline", initialDuration = 0 }: Props) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(initialDuration);
  const [volume, setVolume] = React.useState(1);

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration || initialDuration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [initialDuration]);

  async function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = audioRef.current;
    if (!a) return;
    const v = Number(e.target.value);
    a.currentTime = v;
    setCurrent(v);
  }

  function onVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const a = audioRef.current;
    const v = Number(e.target.value);
    setVolume(v);
    if (a) a.volume = v;
  }

  const isFull = variant === "full";

  return (
    <div
      className={cn(
        "border border-[color:var(--color-line)] bg-[color:var(--color-paper)]",
        isFull ? "p-6 md:p-8" : "p-4",
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" className="sr-only" />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className={cn(
            "flex shrink-0 items-center justify-center border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ink)] focus:ring-offset-2",
            isFull ? "h-14 w-14" : "h-10 w-10",
          )}
        >
          {playing ? (
            <Pause className={isFull ? "h-6 w-6" : "h-4 w-4"} strokeWidth={1.5} />
          ) : (
            <Play className={isFull ? "h-6 w-6" : "h-4 w-4"} strokeWidth={1.5} />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={current}
            onChange={seek}
            aria-label="Seek"
            className="h-[2px] w-full cursor-pointer appearance-none bg-[color:var(--color-line)] accent-[color:var(--color-ink)]"
          />
          <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-muted)]">
            <span>{formatDuration(current)}</span>
            <span>{formatDuration(duration || initialDuration)}</span>
          </div>
        </div>

        {isFull && (
          <div className="hidden items-center gap-2 md:flex">
            <Volume2
              className="h-4 w-4 text-[color:var(--color-muted)]"
              strokeWidth={1.5}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={onVolume}
              aria-label="Volume"
              className="h-[2px] w-20 cursor-pointer appearance-none bg-[color:var(--color-line)] accent-[color:var(--color-ink)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
