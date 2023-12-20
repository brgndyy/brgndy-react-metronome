import React, { PropsWithChildren, useState, useEffect } from "react";
import { useMetronome } from "../MetronomeContext/MetronomeContext";
import { withMetronomeContext } from "../MetronomeContext/withMetronomeContext";

interface MetronomeButtonProps extends PropsWithChildren<{}> {
  className: string;
  buttonTexts: [string, string];
}

function MetronomeButton(props: MetronomeButtonProps) {
  const { className = "", buttonTexts } = props;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <button className={className} onClick={handleClick}>
        {(buttonTexts[1], buttonTexts[0])}
      </button>
      {clicked ? "클릭" : "클릭취소"}
    </>
  );
}

export default MetronomeButton;
