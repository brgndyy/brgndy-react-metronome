import React from "react";
import { MetronomeProvider } from "./MetronomeContext";

export const withMetronomeContext =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <MetronomeProvider>
        <Component {...props} />
      </MetronomeProvider>
    );
  };
