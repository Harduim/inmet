import PageFrame from '../shared/PageFrame'
import { useContext, useState } from 'react'
import EstacaoContext from '../../context/EstacaoContext'
import { useParams } from 'react-router-dom'
import { Select, SelectOption, SelectVariant, SelectGroup } from "@patternfly/react-core";


const MapPage = () => {
  const { estacoes, estacaoId, estacao, estacoesIsLoading, getEstacaoById } = useContext(EstacaoContext)

  const { cd_estacao } = useParams()
  const [selected, setSelected] = useState([])

  if (estacoesIsLoading) {
    return <PageFrame> </PageFrame>
  }


  return (
    <PageFrame>

      <div>MAP {JSON.stringify(getEstacaoById(cd_estacao || estacaoId))} {JSON.stringify(estacao)}</div>
    </PageFrame>
  )
}

export default MapPage