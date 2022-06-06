import React, { createContext, useContext, useState } from "react";

const EstacaoContext = createContext();

export default function EstacaoProvider ({ children }) {
  const [estacaoId, setEstacao] = useState(301);

  return (
    <EstacaoContext.Provider value={{ estacaoId, setEstacao }}>
      {children}
    </EstacaoContext.Provider>
  );
};

export function useEstacao() {
  const context = useContext(EstacaoContext);
  const { estacaoId, setEstacao } = context;
  return { estacaoId, setEstacao }
}
