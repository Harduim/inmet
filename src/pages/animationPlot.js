import React from "react";
import Plot from "react-plotly.js";

export const AnimationPlot = () => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [0, 0.5, 1],
          line: { simplify: false },
        },
      ]}
    />
  );
};
