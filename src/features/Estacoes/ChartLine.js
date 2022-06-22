import React, { useContext } from "react";
import Plot from "react-plotly.js";
import filterContext from "./filterContext";

const ChartLine = () => {
  const { dataEstacao, atributoFinal, validador, codEstacao, estacao, atributo } =
    useContext(filterContext);
  if (validador && dataEstacao && codEstacao) {
    const newData = [
      {
        x: dataEstacao.map((atual, i) => atual.DT_MEDICAO),
        y: dataEstacao.map((atual, i) => atual[atributoFinal]),
      },
    ];

    return (
      <>
        <Plot
          data={newData}
          layout={{
            title: `${dataEstacao[0].CD_ESTACAO} - ${dataEstacao[0].DC_NOME}`,
            font: { size: 13 },
            transition: {
              duration: 500,
              easing: "cubic-in-out",
            },
            yaxis: {
              title:atributoFinal,
              autorange: true,
            },
          }}
          config={{responsive: true}}
          style={{width: '100%'}}
        />
      </>
    );
  }

  return "sem plot hj";
};

export default ChartLine;
