import React, { PropsWithChildren, useEffect } from "react";
import { useMetronome } from "../MetronomeProvider/MetronomeProvider";

interface MetronomeButtonProps extends PropsWithChildren<{}> {
  className: string;
  buttonTexts: [string, string];
}

function MetronomeButton(props: MetronomeButtonProps) {
  const { className = "", buttonTexts } = props;
  const { isPlaying, metronomePlayHandler } = useMetronome();

  return (
    <>
      <button className={className} onClick={metronomePlayHandler}>
        {isPlaying ? buttonTexts[1] : buttonTexts[0]}
      </button>
    </>
  );
}

export default MetronomeButton;
