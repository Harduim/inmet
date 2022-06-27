import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import filterContext from "./filterContext";

const ChartLine = () => {
  const { dataEstacao, atributoFinal, validador, codEstacao, title } =
    useContext(filterContext);
  if (validador && dataEstacao && codEstacao) {
    const newData = [
      {
        x: dataEstacao.map((atual) => atual.DT_MEDICAO),
        y: dataEstacao.map((atual) => atual[atributoFinal]),
      },
    ];

    const layout = {
      autosize: true,
      title: {
        text: title
      },
      font: { size: 13 },
      transition: {
        duration: 500,
        easing: "cubic-in-out",
      },
      yaxis: {
        title: atributoFinal,
        autorange: true,
      },
    };

    return (
      <>
        <Plot
          data={newData}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          useResizeHandler={true}
        />
      </>
    );
  }

  return "sem plot hj";
};

export default ChartLine;
