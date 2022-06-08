import PageFrame from '../shared/PageFrame'
import { useContext } from 'react'
import EstacaoContext from '../../context/EstacaoContext'

const MapPage = () => {
  const { estacoes, estacao, estacoesIsLoading } = useContext(EstacaoContext)
  return (
    <PageFrame>
      <div>MAP</div>
    </PageFrame>
  )
}

export default MapPage