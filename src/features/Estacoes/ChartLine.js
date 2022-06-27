import React, { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import filterContext from "./filterContext";

const ChartLine = () => {
  const { dataEstacao, atributoFinal, validador, codEstacao, title, setTitile } =
    useContext(filterContext);
  const [num, setNum] = useState(1);
  console.log(title)
  if (validador && dataEstacao && codEstacao) {
    const newData = [
      {
        x: dataEstacao.map((atual, i) => atual.DT_MEDICAO),
        y: dataEstacao.map((atual, i) => atual[atributoFinal]),
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
          revision={num}
          data={newData}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          useResizeHandler={true}
        />
        <button onClick={() => setNum((num) => ++num)}>Aumentar 1</button>
      </>
    );
  }

  return "sem plot hj";
};

export default ChartLine;
