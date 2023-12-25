import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

interface MetronomeContextProps {
  isPlaying: boolean;
  metronomePlayHandler: () => void;
}

const MetronomeContext = createContext<MetronomeContextProps>({
  isPlaying: false,
  metronomePlayHandler: () => {},
});

export const useMetronome = () => {
  const context = useContext(MetronomeContext);

  return context;
};

function MetronomeProvider(props: PropsWithChildren<object>) {
  const { children } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  const metronomePlayHandler = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <MetronomeContext.Provider value={{ isPlaying, metronomePlayHandler }}>
      {children}
    </MetronomeContext.Provider>
  );
}

export default MetronomeProvider;
