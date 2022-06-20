import React, { createContext, useState } from 'react'
import api from '../../services/api'
import { useQuery } from 'react-query'

const context = createContext(true)

export const Provider = ({ children }) => {
  const [estacaoId] = useState('A301')
  const [estacao] = useState()

  const getEstacaoById = eid => estacoes.find(e => e.CD_ESTACAO === eid)

  const estacoesQuery = useQuery(
    ['estacoes'],
    () => api.get('/estacoes/T').then(r => r.data),
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

  const provides = {
    estacao,
    estacoes,
    estacoesIsLoading,
    getEstacaoById,
    estacaoId
  }
  return <context.Provider value={provides}>{children}</context.Provider>
}

export default context
