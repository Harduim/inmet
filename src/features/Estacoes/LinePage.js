import PageFrame from '../shared/PageFrame'
import { useContext } from 'react'
import EstacaoContext from '../../context/EstacaoContext'

const LinePage = () => {
  const { estacoes, estacao, estacoesIsLoading } = useContext(EstacaoContext)
  return (
    <PageFrame>
      <div>Line</div>
    </PageFrame>
  )
}

export default LinePage