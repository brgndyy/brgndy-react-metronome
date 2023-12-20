import React, { PropsWithChildren } from "react";
import { useMetronome } from "../MetronomeContext/MetronomeContext";
import { withMetronomeContext } from "../MetronomeContext/WithMetronomeContext";

interface MetronomeButtonProps extends PropsWithChildren<{}> {
  className: string;
  buttonTexts: [string, string];
}

function MetronomeButton(props: MetronomeButtonProps) {
  const { className = "", buttonTexts } = props;
  const { isPlaying, setIsPlaying } = useMetronome();

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={handleClick} className={className}>
      {isPlaying ? buttonTexts[1] : buttonTexts[0]}
    </button>
  );
}

export default withMetronomeContext(MetronomeButton);
