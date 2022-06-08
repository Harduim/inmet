import { useState } from 'react'
import { Select, SelectOption, SelectVariant, SelectGroup } from "@patternfly/react-core";

const SelectEstacao = () => {

    const [isOpen, setIsOpen] = useState(false)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    const onSelect = (e, sel) => {
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


export default SelectEstacao