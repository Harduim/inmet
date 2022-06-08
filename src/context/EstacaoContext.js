import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useQuery } from 'react-query'

const EstacaoContext = createContext(true)

export const EstacaoProvider = ({ children }) => {
  const [estacao, setEstacao] = useState()
  const [estacoes, setEstacoes] = useState()

  const estacoesRequest = useQuery(
    ['estacoes'],
    async () => {
      const resp = await api.get('/T')
      setEstacao(resp.data[0])
      return resp.data
    },
    {
      onError: (error) => {
        console.log(error)
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 3600
    }
  )
  const estacoesIsLoading = estacoesRequest.isLoading

  useEffect(
    () => {
      if (!estacoesRequest.data) return
      setEstacoes(estacoesRequest.data)
    },
    [estacoesRequest.data]
  )

  const provides = { estacao, estacoes, estacoesIsLoading }

  return <EstacaoContext.Provider value={provides}>{children}</EstacaoContext.Provider>
};

export default EstacaoContext