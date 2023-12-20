import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

interface MetronomeContextProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const MetronomeContext = createContext<MetronomeContextProps>({
  isPlaying: false,
  setIsPlaying: () => {},
});

export const useMetronome = () => {
  const context = useContext(MetronomeContext);

  return context;
};

export const MetronomeProvider = (props: PropsWithChildren<object>) => {
  const { children } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MetronomeContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </MetronomeContext.Provider>
  );
};
