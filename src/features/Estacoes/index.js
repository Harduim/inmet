import Layout from '../shared/Layout'
import { useContext } from 'react'
import context, { Provider } from './context'
import { useParams } from 'react-router-dom'

const Estacoes = () => {
  const { estacaoId, estacao, estacoesIsLoading, getEstacaoById } = useContext(context)

  const { cdEstacao } = useParams()

  if (estacoesIsLoading) {
    return <Layout>Teste </Layout>
  }

  return (
    <Layout>
      <div>MAP {JSON.stringify(getEstacaoById(cdEstacao || estacaoId))} {JSON.stringify(estacao)}</div>
    </Layout>
  )
}

export default () => <Provider><Estacoes /></Provider>
