import React, { useState } from "react";
import { useQuery } from "react-query";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";

import { useEstacao } from "../context/EstacaoContext";

export const typePlot = () => {
  return "bar";
};

function Example() {

  const { estacaoId, setEstacao } = useEstacao();
  const { isLoading, error, data, isFetching } = useQuery(
    ["data", estacaoId],
    () => {
      return fetch(
        `https://apitempo.inmet.gov.br/estacao/diaria/2019-10-01/2019-10-31/A${estacaoId}`
      ).then((res) => res.json());
    },
    {
      onError: (error) => {
        console.log(error);
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 50,
    }
  );

  if(isLoading) return "Loading..."

  if (error)
    return (
      <section>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {"An error has occurred: " + error.message}
        </p>
        <div style={{ textAlign: "center" }}>
          <Link to={`/bar/A${estacaoId + 1}`}>
            <button onClick={() => setEstacao((estacao) => estacao + 1)}>
              Next
            </button>
          </Link>
        </div>
      </section>
    );

  return (
    <div>
      <section>
        <p
          style={{ textAlign: "center", marginTop: "20px" }}
        >{`${data[0].DC_NOME} - ${data[0].CD_ESTACAO}`}</p>
        <Plot
          data={[
            {
              x: data.map((el) => el.DT_MEDICAO),
              y: data.map((el) => el.TEMP_MAX),
              type: typePlot(),
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{
            transition: {
              duration: 500,
              easing: "cubic-in-out",
            },
            yaxis: {
              autorange: false,
              range: [25, 40],
            },
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </section>
      <div style={{ textAlign: "center" }}>
        <Link to={`/bar/A${estacaoId - 1}`}>
          <button onClick={() => setEstacao((estacao) => estacao - 1)}>
            Prev
          </button>
        </Link>
        <Link to={`/bar/A${estacaoId + 1}`}>
          <button onClick={() => setEstacao((estacao) => estacao + 1)}>
            Next
          </button>
        </Link>
        <Link to={`/scatter/A${estacaoId}`}>
          <button>Scatter</button>
        </Link>
      </div>
      {isFetching && <p style={{ textAlign: "center" }}>Atualizando dados.</p>}
    </div>
  );
}

export function Bar() {
  return <Example />;
}
