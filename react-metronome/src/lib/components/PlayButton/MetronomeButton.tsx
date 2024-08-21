import React, { PropsWithChildren, useEffect } from "react";
import useMetronome from "../../hooks/useMetronome";

interface MetronomeButtonProps
  extends PropsWithChildren<{
    className?: string;
    buttonTexts?: [string, string];
  }> {}

function MetronomeButton(props: MetronomeButtonProps) {
  const { className = "", buttonTexts = ["재생", "일시정지"] } = props;
  const { isPlaying, handleMetronomePlay } = useMetronome();

  return (
    <button className={className} onClick={handleMetronomePlay}>
      {isPlaying ? buttonTexts[1] : buttonTexts[0]}
    </button>
  );
}

export default MetronomeButton;
