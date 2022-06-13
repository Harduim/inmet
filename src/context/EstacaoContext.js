import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useQuery } from 'react-query'

const EstacaoContext = createContext(true)

export const EstacaoProvider = ({ children }) => {
  const [estacaoId, setEstacaoId] = useState('A301')
  const [estacao, setEstacao] = useState()

  const getEstacaoById = eid => estacoes.find(e => e.CD_ESTACAO == eid)

  const estacoesQuery = useQuery(
    ['estacoes'],
    () => api.get('/T').then(r => r.data),
    {
      onError: (error) => {
        console.log(error)
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 3600
    }
  )

  const estacoesIsLoading = estacoesQuery.isLoading
  const estacoes = estacoesQuery.data

  const estacoesTeste = estacoes
  console.log(estacoesTeste)

  const provides = {
    estacao,
    estacoes,
    estacoesIsLoading,
    getEstacaoById,
    estacaoId,
  }

  return <EstacaoContext.Provider value={provides}>{children}</EstacaoContext.Provider>
};

export default EstacaoContext