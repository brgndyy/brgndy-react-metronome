import { createContext } from 'react';

export interface ContextPropsType {
  isPlaying: boolean;
  handleMetronomePlay: () => void;
}

const MetronomeContext = createContext<ContextPropsType>({
  isPlaying: false,
  handleMetronomePlay: () => {},
});

export default MetronomeContext;
