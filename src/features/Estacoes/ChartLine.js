import React, { useContext } from "react";
import Plot from "react-plotly.js";
import filterContext from "./filterContext";

const ChartLine = () => {
  const { dataEstacao, atributoFinal, validador, codEstacao } = useContext(filterContext);

  if (validador && dataEstacao) {
    const newData = [
      {
        x: dataEstacao.map((atual, i) => atual.DT_MEDICAO),
        y: dataEstacao.map((atual, i) => atual[atributoFinal]),
      },
    ];

    return (
      <>
        <h2>ChartLine</h2>
        <Plot
          data={newData}
          layout={{
            transition: {
              duration: 500,
              easing: "cubic-in-out",
            },
            yaxis: {
              autorange: true,
            },
          }}
        />
      </>
    );
  }

  return 'sem plot hj'
};

export default ChartLine;
