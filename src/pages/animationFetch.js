import React, { useState } from "react";
import { useQuery } from "react-query";
import Plot from "react-plotly.js";

export const AnimationFetch = () => {
  const [estacaoId, setEstacao] = useState(301);

  const { isLoading, error, data, isFetching } = useQuery(
    ["animation", estacaoId],
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

  if(isLoading) return "...Loading"

  if (error)
    return (
      <section>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {"An error has occurred: " + error.message}
        </p>
        <button onClick={() => setEstacao((estacao) => estacao + 1)}>
          Next
        </button>
      </section>
    );

  const newData = [
      {
        x: data.map((el) => el.DT_MEDICAO),
        y: data.map((el) => el.TEMP_MAX),
        type: "bar",
        mode: "lines+markers",
        marker: { color: "red" },
      },
    ]

  const prev = () => {
    setEstacao((estacao) => estacao - 1);
  };

  const next = () => {
    setEstacao((estacao) => estacao + 1);
  };

  return (
    <div>
      <section>
        <p
          style={{ textAlign: "center", marginTop: "20px" }}
        >{`${data[0].DC_NOME} - ${data[0].CD_ESTACAO}`}</p>
        <Plot
          data={newData}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </section>
      <div style={{ textAlign: "center" }}>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      {isFetching && <p style={{ textAlign: "center" }}>Atualizando dados.</p>}
    </div>
  );
};
