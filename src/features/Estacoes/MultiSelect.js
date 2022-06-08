import { useState } from 'react'
import { Select, SelectOption, SelectVariant, SelectGroup } from "@patternfly/react-core";

const MultiSelect = (props) => {
    const {
        entities,
        entityName,
        entityIdName,
        selected,
        setSelected,
        placeholderText,
        defaultEntities,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    const onSelect = (e, sel) => {
        const selEnt = entities.find(t => t[entityName] === sel)
        if (selected.includes(selEnt)) {
            const newSelected = selected.filter(t => t[entityName] !== sel)
            if (newSelected.length === 0) return
            return setSelected(newSelected)
        }
        const newSelected = [...selected, selEnt]
        if (newSelected.length > 3) return
        setSelected(newSelected)
    }

    const options = entities.map(t => <SelectOption key={t[entityIdName]} value={t[entityName]} />)

    const selections = selected.length > 0 ? selected : defaultEntities

    return <Select
        hasInlineFilter
        noResultsFoundText={`Nenhum ${placeholderText} encontrado`}
        onFilter={() => { }}
        variant={SelectVariant.checkbox}
        onToggle={onToggle}
        onSelect={onSelect}
        selections={selections}
        isOpen={isOpen}
        placeholderText={placeholderText}
        isGrouped
        maxHeight={500}
    >
        {options}
    </Select>
}


export default MultiSelect