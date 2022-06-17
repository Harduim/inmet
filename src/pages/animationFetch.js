import React, { useEffect, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import Plot from "react-plotly.js";

import placeholderData from "./placeholderData";
import { ReactQueryDevtools } from "react-query/devtools";

import { queryClient } from "../App";

const arrPlaceHolder = [placeholderData];

export const AnimationFetch = () => {
  const [estacaoId, setEstacao] = useState(301);
  const queryKeyAnimation = "animation";

  const { isLoading, error, data, isFetching } = useQuery(
    [queryKeyAnimation, estacaoId],
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
      //placeholderData: () => queryClient.getQueryData([queryKeyAnimation, estacaoId])
      placeholderData: arrPlaceHolder.at(-1)
    }
  );

  console.log(
    queryClient.getQueriesData(queryKeyAnimation).at(-1)[1] ? true : false
  );

  // useEffect(() => {
  //   if (queryClient.getQueryData([queryKeyAnimation, estacaoId])) {
  //     arrPlaceHolder.push(
  //       queryClient.getQueryData([queryKeyAnimation, estacaoId])
  //     );

  //     console.log(arrPlaceHolder);
  //   }
  // });

  useEffect(() => {
    if (data) {
      arrPlaceHolder.push(data);

      console.log(arrPlaceHolder);
    }
  });

  if (isLoading) return "...Loading";

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
      marker: { color: "blue" },
    },
  ];

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
          layout={{
            transition: {
              duration: 500,
              easing: "cubic-in-out",
            },
            yaxis: {
              autorange: false,
              range: [0, 40],
            },
          }}
        />
      </section>
      <div style={{ textAlign: "center" }}>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      {isFetching && <p style={{ textAlign: "center" }}>Atualizando dados.</p>}
      <ReactQueryDevtools />
    </div>
  );
};
