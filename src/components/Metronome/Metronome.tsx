import React, { useState, useEffect, PropsWithChildren } from "react";
import tickSound from "./tick.wav";
import tockSound from "./tock.wav";
import CONDITION from "../../constants/condition";
import { useMetronome } from "../MetronomeContext/MetronomeContext";
import { withMetronomeContext } from "../MetronomeContext/WithMetronomeContext";

interface MetronomeProps extends PropsWithChildren<{}> {
  type: "number" | "range";
  className: string;
  minBpm: number;
  maxBpm: number;
}

function Metronome(props: MetronomeProps) {
  const { isPlaying } = useMetronome();
  const { type = "number", className = "" } = props;
  const [minBpm, setMinBpm] = useState<number>(
    props.minBpm || CONDITION.min_bpm
  );
  const [maxBpm, setMaxBpm] = useState<number>(
    props.maxBpm || CONDITION.max_bpm
  );
  const [tick, setTick] = useState<HTMLAudioElement>();
  const [tock, setTock] = useState<HTMLAudioElement>();
  const [bpm, setBpm] = useState<number>(60);

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));

    setMinBpm((prev) => Math.max(CONDITION.min_bpm, props.minBpm || prev));
    setMaxBpm((prev) => Math.min(CONDITION.max_bpm, props.maxBpm || prev));
  }, [props.minBpm, props.maxBpm]);

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

export default withMetronomeContext(Metronome);
