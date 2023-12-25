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
import CONDITION from "../../constants/condition";
import useMetronome from "../../hooks/useMetronome";

interface MetronomeProps extends PropsWithChildren<{}> {
  type: "number" | "range";
  className: string;
  minBpm: number;
  maxBpm: number;
}

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
  const [first, setFirst] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    console.log("메트로놈 컴포넌트 안에서의 isPlaying : ", isPlaying);
  }, [isPlaying]);

  const metronomePlayHandler = useCallback(() => {
    if (!first && tick) {
      setFirst(true);
      tick.play();
    } else if (count === CONDITION.min_metronome_count && tick) {
      tick.play();
    } else if (count < CONDITION.max_metronome_count + 1 && tock) {
      tock.play();
    }
    if (count >= CONDITION.max_metronome_count) {
      setCount(CONDITION.min_metronome_count);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count, tick, tock, first]);

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));

    setMinBpm((prev) => Math.max(CONDITION.min_bpm, props.minBpm || prev));
    setMaxBpm((prev) => Math.min(CONDITION.max_bpm, props.maxBpm || prev));
  }, [props.minBpm, props.maxBpm]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        metronomePlayHandler();
      }
    }, (60 / bpm) * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [bpm, isPlaying]);

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
