import React, { useState, useEffect, PropsWithChildren } from "react";
import tickSound from "./tick.wav";
import tockSound from "./tock.wav";

interface MetronomeProps extends PropsWithChildren<{}> {
  type?: "number" | "range";
  className: string;
  minBpm: number;
  maxBpm: number;
}

export default function Metronome(props: MetronomeProps) {
  const { type = "number", className = "", minBpm = 1, maxBpm = 300 } = props;
  const [tick, setTick] = useState<HTMLAudioElement>();
  const [tock, setTock] = useState<HTMLAudioElement>();
  const [bpm, setBpm] = useState<number>(60);

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));
  }, []);

  return (
    <input
      type={type}
      className={className}
      min={minBpm}
      max={maxBpm}
      value={bpm}
    />
  );
}
