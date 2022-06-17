import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Plot from "react-plotly.js";
import { useParams, useNavigate } from "react-router-dom";

export function Test() {
  const [estacaoId, setEstacao] = useState(310);

  let propData = [
    {
      x: ["giraffes", "orangutans", "monkeys"],
      y: [0,0,0],
      type: "bar",
      tag: "initial",
    },
    {
      x: ["giraffes", "orangutans", "monkeys"],
      y: [0,0,0],
      type: "bar",
      tag: "initial",
    },
  ];

  const [data, setData] = useState(propData);

  const newData = () => {
    console.log('clique')
    setData([
      {
        x: ["giraffes", "orangutans", "monkeys"],
        y: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ],
        type: "bar",
        tag: "initial",
      },
      {
        x: ["giraffes", "orangutans", "monkeys"],
        y: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ],
        type: "bar",
        tag: "initial",
      },
    ]);
  };

  useEffect(() => {
    const timer = setTimeout(() => newData())
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section>
        <Plot
          data={data}
          layout={{
            height: 500,
            width: 500,
            transition: {
              duration: 2000,
              easing: "cubic-in-out",
            },
            yaxis: { 
              autorange: false,
              range: [0,100]
            }
          }}
        />
      </section>
      <div style={{ textAlign: "center" }}>
        <button onClick={newData}>Animate</button>
      </div>
    </div>
  );
}
