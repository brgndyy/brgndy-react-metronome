import React from "react";
import {
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import tickSound from "./tick.wav";
import tockSound from "./tock.wav";
import useMetronome from "../../hooks/useMetronome";

const CONDITION = {
  min_bpm: 1,
  max_bpm: 300,
  min_metronome_count: 1,
  max_metronome_count: 4,
} as const;

interface MetronomeProps
  extends React.PropsWithChildren<{
    type?: "number" | "range";
    className?: string;
    minBpm?: number;
    maxBpm?: number;
  }> {}

function Metronome(props: MetronomeProps) {
  const bpmRef = useRef<HTMLInputElement | null>(null);
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
  const [count, setCount] = useState<number>(1);
  const [blur, setBlur] = useState(false);

  const metronomePlayHandler = useCallback(() => {
    const nextCount =
      count >= CONDITION.max_metronome_count
        ? CONDITION.min_metronome_count
        : count + 1;

    if (nextCount === CONDITION.min_metronome_count && tick) {
      tick.play();
    } else if (nextCount > CONDITION.min_metronome_count && tock) {
      tock.play();
    }

    setCount(nextCount);
  }, [count, tick, tock]);

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));

    setMinBpm((prev) => Math.max(CONDITION.min_bpm, props.minBpm || prev));
    setMaxBpm((prev) => Math.min(CONDITION.max_bpm, props.maxBpm || prev));
  }, [props.minBpm, props.maxBpm]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isPlaying) {
          metronomePlayHandler();
        }
      },
      (60 / bpm) * 1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [bpm, isPlaying, count]);

  const bpmChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newBpm = parseInt(e.target.value, 10);
    if (newBpm < CONDITION.min_bpm) {
      newBpm = CONDITION.min_bpm;
    }
    if (newBpm > CONDITION.max_bpm) {
      newBpm = CONDITION.max_bpm;
      if (bpmRef.current) {
        bpmRef.current.blur();
      }
    }
    setBpm(newBpm);
    if (bpmRef.current && Number.isNaN(newBpm)) {
      bpmRef.current.focus();
    }
    if (bpmRef.current && newBpm > CONDITION.max_bpm) {
      bpmRef.current.blur();
    }
  };

  const bpmBlurHandler = () => {
    if (bpmRef.current && bpm > CONDITION.max_bpm) {
      setBpm(CONDITION.max_bpm);
      bpmRef.current.blur();
    }
    if (bpmRef.current && Number.isNaN(bpm)) {
      setBpm(CONDITION.min_bpm);
      bpmRef.current.blur();
    }
    setBlur(true);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (bpmRef.current && e.key === "Enter") {
      const newBpm = parseInt(e.currentTarget.value, 10);

      if (Number.isNaN(newBpm)) {
        setBpm(CONDITION.min_bpm);
      }
      e.currentTarget.blur();
    }
  };

  const focusHandler = () => {
    setBlur(false);
  };

  useEffect(() => {
    if (bpmRef.current && bpmRef.current !== document.activeElement) {
      bpmRef.current.blur();
    }
  }, [bpmRef]);

  return (
    <input
      ref={bpmRef}
      type={type}
      className={className}
      step={1}
      min={minBpm}
      max={maxBpm}
      value={bpm}
      onBlur={bpmBlurHandler}
      onFocus={focusHandler}
      onChange={bpmChangeHandler}
      onKeyDown={keyDownHandler}
    />
  );
}

export default Metronome;
