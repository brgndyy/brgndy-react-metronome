import { PropsWithChildren, useMemo } from 'react';
import MetronomeContext from '../../context/MetronomeContext';
import useMetronome from '../../hooks/useMetronome';
import PlayButton from '../PlayButton/PlayButton';
import BPMInput from '../BPMInput/BPMInput';

type Props = {
  maxBpm?: number;
  minBpm?: number;
};

function Metronome({ children, minBpm = 1, maxBpm = 300 }: PropsWithChildren<Props>) {
  const metronome = useMetronome({ minBpm, maxBpm });

  const contextValue = useMemo(
    () => ({
      ...metronome,
      minBpm,
      maxBpm,
    }),
    [metronome, minBpm, maxBpm],
  );

  return <MetronomeContext.Provider value={contextValue}>{children}</MetronomeContext.Provider>;
}

export default Metronome;

Metronome.BPMInput = BPMInput;
Metronome.PlayButton = PlayButton;
