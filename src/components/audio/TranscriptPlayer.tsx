import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatTime } from "@/lib/utils";

export interface TranscriptSegment {
  start: number;
  end: number;
  speaker?: string;
  text: string;
  /** Alasan baris ini perlu didengar ulang. */
  flag?: string;
}

interface TranscriptPlayerProps {
  segments: TranscriptSegment[];
  /** URL file audio, misal "/samples/wawancara.mp3". Kosong = mode simulasi tanpa suara. */
  audioSrc?: string | null;
  /** Durasi dalam detik. Wajib untuk mode simulasi. */
  duration: number;
}

/**
 * Pemutar audio dengan transkrip yang tersinkron.
 * Komponen ini menyorot baris yang sedang diputar. Klik baris memindahkan posisi audio.
 * Tanpa `audioSrc`, komponen menjalankan jam simulasi supaya demo tetap berjalan.
 */
export function TranscriptPlayer({ segments, audioSrc, duration }: TranscriptPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const simulated = !audioSrc;

  // Jam simulasi: maju 0,25 detik setiap 250 ms.
  useEffect(() => {
    if (!simulated || !playing) return;
    const timer = setInterval(() => {
      setTime((current) => {
        if (current + 0.25 >= duration) {
          setPlaying(false);
          return duration;
        }
        return current + 0.25;
      });
    }, 250);
    return () => clearInterval(timer);
  }, [simulated, playing, duration]);

  const toggle = () => {
    if (simulated) {
      if (!playing && time >= duration) setTime(0);
      setPlaying((p) => !p);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play();
    else audio.pause();
  };

  const seek = (seconds: number) => {
    setTime(seconds);
    if (!simulated && audioRef.current) audioRef.current.currentTime = seconds;
  };

  const active = segments.findIndex((s) => time >= s.start && time < s.end);

  return (
    <div className="rounded-md border bg-card">
      {!simulated && (
        <audio
          ref={audioRef}
          src={audioSrc ?? undefined}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      <div className="flex items-center gap-3 border-b px-3 py-2">
        <Button size="icon" onClick={toggle} aria-label={playing ? "Jeda" : "Putar"}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.25}
          value={time}
          onChange={(event) => seek(Number(event.target.value))}
          className="flex-1 accent-primary"
          aria-label="Posisi audio"
        />
        <span className="w-20 text-right text-xs tabular-nums text-muted-foreground">
          {formatTime(time)} / {formatTime(duration)}
        </span>
      </div>
      {simulated && (
        <p className="border-b bg-warning/10 px-3 py-1.5 text-xs text-warning">
          Mode simulasi: tidak ada file audio. Jam berjalan tanpa suara.
        </p>
      )}

      <ol className="max-h-96 overflow-y-auto p-2">
        {segments.map((segment, index) => (
          <li key={segment.start}>
            <button
              type="button"
              onClick={() => seek(segment.start)}
              className={cn(
                "flex w-full cursor-pointer gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                index === active && "bg-accent ring-1 ring-primary/40",
              )}
            >
              <span className="w-10 shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatTime(segment.start)}
              </span>
              <span className="flex-1">
                {segment.speaker && <strong className="mr-1">{segment.speaker}:</strong>}
                {segment.text}
                {segment.flag && (
                  <span className="mt-1 flex items-center gap-1 text-xs text-warning">
                    <AlertTriangle className="size-3" /> {segment.flag}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
