import { createContext } from "react";
import { ContextPropsType } from "../@types/ContextPropsType";

const MetronomeContext = createContext<ContextPropsType>({
  isPlaying: false,
  metronomePlayHandler: () => {},
});

export default MetronomeContext;
