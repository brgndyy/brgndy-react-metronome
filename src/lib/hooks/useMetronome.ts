import { useCallback, useEffect, useRef, useState } from 'react';
import tickSound from '../../lib/assets/tick.wav';
import tockSound from '../../lib/assets/tock.wav';

const CONDITION = {
  min_metronome_count: 1,
  max_metronome_count: 4,
} as const;

type UseMetronomeHookProps = {
  minBpm: number;
  maxBpm: number;
};

const useMetronome = ({ minBpm, maxBpm }: UseMetronomeHookProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const bpmRef = useRef<HTMLInputElement | null>(null);
  const [tick] = useState<HTMLAudioElement>(new Audio(tickSound));
  const [tock] = useState<HTMLAudioElement>(new Audio(tockSound));
  const [bpm, setBpm] = useState<number>(60);
  const [count, setCount] = useState<number>(CONDITION.min_metronome_count);

  const handlePlayMetronomeSound = useCallback(async () => {
    if (count === CONDITION.min_metronome_count && tick) {
      tick.currentTime = 0;
      await tick.play();
    } else if (count > CONDITION.min_metronome_count && tock) {
      tock.currentTime = 0;
      await tock.play();
    }

    setCount((prevCount) =>
      prevCount >= CONDITION.max_metronome_count ? CONDITION.min_metronome_count : prevCount + 1,
    );
  }, [count, tick, tock]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isPlaying) {
          handlePlayMetronomeSound();
        }
      },
      (60 / bpm) * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [bpm, isPlaying, handlePlayMetronomeSound]);

  const handleBPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newBpm = parseInt(e.target.value, 10);
    if (newBpm < minBpm) {
      newBpm = minBpm;
    }
    if (newBpm > maxBpm) {
      newBpm = maxBpm;
    }
    setBpm(newBpm);
  };

  const handleBPMInputBlur = () => {
    if (bpmRef.current && (Number.isNaN(bpm) || bpm > maxBpm)) {
      setBpm(maxBpm);
    }
  };

  const handleBPMKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newBpm = parseInt(e.currentTarget.value, 10);
      if (Number.isNaN(newBpm)) {
        setBpm(minBpm);
      }
      e.currentTarget.blur();
    }
  };

  const handleBPMInputFocus = () => {
    if (bpmRef.current && bpmRef.current !== document.activeElement) {
      bpmRef.current.blur();
    }
  };

  useEffect(() => {
    if (bpmRef.current && bpmRef.current !== document.activeElement) {
      bpmRef.current.blur();
    }
  }, [bpmRef]);

  const handleTogglePlaying = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return {
    isPlaying,
    bpm,
    bpmRef,
    handleBPMInputBlur,
    handleBPMKeydown,
    handleBPMInputFocus,
    handleBPMChange,
    handleTogglePlaying,
  };
};

export default useMetronome;
