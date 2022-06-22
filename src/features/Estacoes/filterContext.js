import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../../services/api";
import { useLocation, useParams } from "react-router-dom";

const filterContext = createContext(true);

export const FilterProvider = ({ children }) => {
  const [estacao, setEstacao] = useState("A301 - RECIFE");
  const [initialDate, setInitialDate] = useState("01-10-2019");
  const [finalDate, setFinalDate] = useState("31-10-2019");
  const [atributo, setAtributo] = useState("CHUVA");
  const [dataEstacao, setDataEstacao] = useState(null);
  const [initialDateFormat, setInitialDateFormat] = useState("2019-10-01");
  const [finalDateFormat, setFinalDateFormat] = useState("2019-10-31");
  const [codEstacao, setCodEstacao] = useState("A301");
  const [atributoFinal, setAtributoFinal] = useState("CHUVA");

  const [validador, setValidador] = useState(true);
  const { atributoId, initialDateId, finalDateId, codEstacaoId } = useParams();

  useEffect(() => {
    if (atributoId && initialDateId && finalDateId && codEstacaoId) {
      setInitialDateFormat(initialDateId);
      setFinalDateFormat(finalDateId);
      setCodEstacao(codEstacaoId);
      setAtributoFinal(atributoId);
      console.log('entrou')
    }
  },[]);

  const {data, isFetching} = useQuery(
    ["dataPlot", initialDateFormat, finalDateFormat, codEstacao],
    () => {
      console.log('inicio use query')
      return fetch(
        `https://apitempo.inmet.gov.br/estacao/diaria/${initialDateFormat}/${finalDateFormat}/${codEstacao}`
      ).then((res) => res.json());
    },
      // api
      //   .get(
      //     `estacao/diaria/${initialDateFormat}/${finalDateFormat}/${codEstacao}`
      //   )
      //   .then((r) => r.data),
    {
      onError: (error) => {
        console.log("erro no fetch dos dados");
      },
      onSuccess: (data) => {
        setDataEstacao(data);
        console.log("fetch sucess");
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  // if(dataPlot) {
  //   console.log(dataPlot)
  // }

  if(data) {
    console.log(data)
  }

  const provides = {
    estacao,
    setEstacao,
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
    dataEstacao,
    setDataEstacao,
    initialDateFormat,
    setInitialDateFormat,
    finalDateFormat,
    setFinalDateFormat,
    codEstacao,
    setCodEstacao,
    atributo,
    setAtributo,
    atributoFinal,
    setAtributoFinal,
    validador,
    setValidador,
    isFetching
  };

  return (
    <filterContext.Provider value={provides}>{children}</filterContext.Provider>
  );
};

export default filterContext;
