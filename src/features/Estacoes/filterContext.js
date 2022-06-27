import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import placeholderData from "./placeholderData";

const filterContext = createContext(true);
const arrPlaceHolder = [placeholderData];

export const FilterProvider = ({ children }) => {
  const [estacao, setEstacao] = useState("A301 - RECIFE");
  const [initialDate, setInitialDate] = useState("01-10-2019");
  const [finalDate, setFinalDate] = useState("31-10-2019");
  const [atributo, setAtributo] = useState("CHUVA");
  const [initialDateFormat, setInitialDateFormat] = useState("2019-10-01");
  const [finalDateFormat, setFinalDateFormat] = useState("2019-10-31");
  const [codEstacao, setCodEstacao] = useState("A301");
  const [atributoFinal, setAtributoFinal] = useState("CHUVA");
  const [title, setTitle] = useState("A301 - RECIFE");
  const [validador, setValidador] = useState(true);
  const { atributoId, initialDateId, finalDateId, codEstacaoId } = useParams();

  console.log('estacao',title)

  useEffect(() => {
    if (atributoId && initialDateId && finalDateId && codEstacaoId) {
      setInitialDateFormat(initialDateId);
      setFinalDateFormat(finalDateId);
      setCodEstacao(codEstacaoId);
      setAtributoFinal(atributoId);
    }
  }, []);

  const { data: dataEstacao, isFetching } = useQuery(
    ["dataPlot", initialDateFormat, finalDateFormat, codEstacao],
    () =>
      api
        .get(
          `estacao/diaria/${initialDateFormat}/${finalDateFormat}/${codEstacao}`
        )
        .then((r) => r.data),
    {
      onError: (error) => {
        console.log("erro no fetch dos dados");
      },
      onSuccess: () => {
        console.log("fetch sucess");
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
      placeholderData: arrPlaceHolder.at(-1),
    }
  );

  useEffect(() => {
    if (dataEstacao) {
      arrPlaceHolder.push(dataEstacao);
    }
  });

  const provides = {
    estacao,
    setEstacao,
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
    dataEstacao,
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
    isFetching,
    title,
    setTitle,
  };

  return (
    <filterContext.Provider value={provides}>{children}</filterContext.Provider>
  );
};

export default filterContext;
