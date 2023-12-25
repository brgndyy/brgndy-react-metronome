import React, { useState, PropsWithChildren } from "react";
import MetronomeContext from "../../context/MetronomeContext";

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
