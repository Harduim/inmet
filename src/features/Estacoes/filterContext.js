import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import api from "../../services/api";

const filterContext = createContext(true);

export const FilterProvider = ({ children }) => {
  const [estacao, setEstacao] = useState("A301 - RECIFE");
  const [initialDate, setInitialDate] = useState("01-10-2019");
  const [finalDate, setFinalDate] = useState("31-10-2019");
  const [dataEstacao, setDataEstacao] = useState(null);
  const [_initialDateFormat, setInitialDateFormat] = useState("2019-10-01");
  const [_finalDateFormat, setFinalDateFormat] = useState("2019-10-31");
  const [_codEstacao, setCodEstacao] = useState("A301");

  const dataPlot = useQuery(
    ["dataPlot", _initialDateFormat, _finalDateFormat, _codEstacao],
    () =>
      api
        .get(
          `estacao/diaria/${_initialDateFormat}/${_finalDateFormat}/${_codEstacao}`
        )
        .then((r) => r.data),
    {
      onError: (error) => {
        console.log("erro no fetch dos dados");
      },
      onSuccess: (data) => {
        setDataEstacao(data)
        console.log('fetch sucess');
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 3600,
    }
  );

  if (dataPlot.data) {
    console.log(dataPlot.data[0].DC_NOME);
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
    _initialDateFormat,
    setInitialDateFormat,
    _finalDateFormat,
    setFinalDateFormat,
    _codEstacao,
    setCodEstacao,
  };

  return (
    <filterContext.Provider value={provides}>{children}</filterContext.Provider>
  );
};

export default filterContext;
