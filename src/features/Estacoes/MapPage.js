import PageFrame from '../shared/PageFrame'
import { useContext } from 'react'
import EstacaoContext from '../../context/EstacaoContext'
import { useParams } from 'react-router-dom'

const MapPage = () => {
  const { estacaoId, estacao, estacoesIsLoading, getEstacaoById } = useContext(EstacaoContext)

  const { cdEstacao } = useParams()

  if (estacoesIsLoading) {
    return <PageFrame>Teste </PageFrame>
  }

  return (
    <PageFrame>

      <div>MAP {JSON.stringify(getEstacaoById(cdEstacao || estacaoId))} {JSON.stringify(estacao)}</div>
    </PageFrame>
  )
}

export default MapPage
