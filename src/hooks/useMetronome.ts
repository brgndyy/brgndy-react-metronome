import { useContext } from "react";
import MetronomeContext from "../context/MetronomeContext";

const useMetronome = () => {
  const context = useContext(MetronomeContext);

  return context;
};

export default useMetronome;
