import PageFrame from "../shared/PageFrame";
import { useContext, useState } from "react";
import EstacaoContext from "../../context/EstacaoContext";

import {
  Select,
  SelectOption,
  SelectVariant,
  SelectGroup,
  OptionsMenu,
} from "@patternfly/react-core";

const LinePage = () => {
  const { estacoes, estacao, estacoesIsLoading } = useContext(EstacaoContext);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = [
    <SelectOption key={0} value="Rio de Janeiro" />,
    <SelectOption key={1} value="Florida" />,
    <SelectOption key={2} value="New Jersey" />,
    <SelectOption key={3} value="New Mexico" />,
    <SelectOption key={4} value="New York" />,
    <SelectOption key={5} value="North Carolina" />,
  ];

  const onToggle = (isOpen) => setOpen(isOpen);
  const onSelect = (event, selection, isPlaceholder) => {
    console.log(event, selection, isPlaceholder)
    if (isPlaceholder){
      setSelected(null);
      setOpen(false);
    }
    else {
      setSelected(selection);
      setOpen(false);
    }
  };

  const clearSelection = () => {
    setSelected(null);
    setOpen(false);
  };

  const customFilter = (_, value) => {
    if (!value) {
      return options;
    }

    const input = new RegExp(value, "i");
    return options.filter((child) => input.test(child.props.value));
  };

  const Teste = () => {
    return (
      <Select
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel="Select a state"
        onToggle={onToggle}
        onSelect={(a,b,c) => onSelect(a,b,c)}
        onClear={clearSelection}
        onFilter={customFilter}
        selections={selected}
        isOpen={isOpen}
        placeholderText="Select a state"
      >
        {options}
      </Select>
    );
  };

  return (
    <PageFrame>
      <Teste />
    </PageFrame>
  );
};

export default LinePage;
