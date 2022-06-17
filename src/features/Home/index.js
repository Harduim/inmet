import PageFrame from '../shared/PageFrame'
import { useContext } from 'react'
import EstacaoContext from '../../context/EstacaoContext'

const Home = () => {
  const { estacoes, estacao, estacoesIsLoading } = useContext(EstacaoContext)
  return (
    <PageFrame>
      <div>TESTE</div>
      <div>{JSON.stringify(estacao)}</div>
      <div>{JSON.stringify(estacoesIsLoading)}</div>
      <div>OI</div>
      <div>{JSON.stringify(estacoes)}</div>
    </PageFrame>
  )
}

export default Home
