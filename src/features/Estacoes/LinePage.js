import PageFrame from '../shared/PageFrame'
import { useContext, useState, useEffect } from 'react'
import EstacaoContext from '../../context/EstacaoContext'

import {
  Select,
  SelectOption,
  SelectVariant
} from '@patternfly/react-core'

const LinePage = () => {
  const Teste = () => {
    const { estacoes } = useContext(EstacaoContext)
    const [listEstacoes, setListEstacoes] = useState([])

    useEffect(() => {
      if (estacoes) {
        console.log(estacoes)
        const list = estacoes.map(({ CD_ESTACAO, DC_NOME }) => <SelectOption key={CD_ESTACAO} value={`${CD_ESTACAO} - ${DC_NOME}`} />)
        console.log(list)

        setListEstacoes(list)
      }
    }, [estacoes])

    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    const onToggle = (isOpen) => setOpen(isOpen)
    const onSelect = (event, selection, isPlaceholder) => {
      console.log(event, selection, isPlaceholder)
      if (isPlaceholder) clearSelection()
      else {
        setSelected(selection)
        setOpen(false)
      }
    }

    const clearSelection = () => {
      setSelected(null)
      setOpen(false)
    }

    const customFilter = (_, value) => {
      if (!value) {
        return listEstacoes
      }

      const input = new RegExp(value, 'i')
      return listEstacoes.filter((child) => input.test(child.props.value))
    }
    return (
      <Select
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel='Select a state'
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        onFilter={customFilter}
        selections={selected}
        isOpen={isOpen}
        placeholderText='Select a state'
      >
        {listEstacoes}
      </Select>
    )
  }

  return (
    <PageFrame>
      <Teste />
    </PageFrame>
  )
}

export default LinePage
