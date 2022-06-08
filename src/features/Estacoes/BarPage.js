import PageFrame from '../shared/PageFrame'
import { useContext } from 'react'
import EstacaoContext from '../../context/EstacaoContext'

const BarPage = () => {
  const { estacoes, estacao, estacoesIsLoading } = useContext(EstacaoContext)
  return (
    <PageFrame>
      <div>BAR</div>
    </PageFrame>
  )
}

export default BarPage