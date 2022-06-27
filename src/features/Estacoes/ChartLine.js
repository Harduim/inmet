import React, { useContext } from "react";
import Plot from "react-plotly.js";
import filterContext from "./filterContext";

const ChartLine = () => {
  const {
    dataEstacao,
    atributoFinal,
    validador,
    codEstacao,
    num,
    title,
  } = useContext(filterContext);

  if (validador && dataEstacao && codEstacao && title) {
    const newData = [
      {
        x: dataEstacao.map((atual) => atual.DT_MEDICAO),
        y: dataEstacao.map((atual) => atual[atributoFinal]),
      },
    ];

    return (
      <>
        <Plot
          key={num}
          data={newData}
          layout={{
            autosize: true,
            title: {
              text: title,
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
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          useResizeHandler={true}
        />
      </>
    );
  }

  return null;
};

export default ChartLine;
