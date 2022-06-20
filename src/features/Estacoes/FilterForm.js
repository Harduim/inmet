import React, { useContext, useEffect, useState } from "react";
import context from "./context";
import filterContext, { FilterProvider } from "./filterContext";

import {
  Select,
  SelectOption,
  SelectVariant,
  SelectGroup,
  OptionsMenu,
  DatePicker,
  Button,
} from "@patternfly/react-core";

const SelectEstacao = () => {
  const { estacao, setEstacao } = useContext(filterContext);
  const { estacoes } = useContext(context);
  const [listEstacoes, setListEstacoes] = useState([]);
  const [isOpen, setOpen] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (estacoes) {
      const list = estacoes.map(({ CD_ESTACAO, DC_NOME }) => (
        <SelectOption
          key={CD_ESTACAO}
          value={`${CD_ESTACAO} - ${DC_NOME}`}
          onClick={({ target }) => {
            setEstacao(target.innerText);
          }}
        />
      ));

      setListEstacoes(list);
    }
  }, [estacoes]);

  const onToggle = (isOpen) => setOpen(isOpen);
  const onSelect = (event, selection, isPlaceHolder) => {
    if (isPlaceHolder) clearSelection();
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
      return listEstacoes;
    }

    const input = new RegExp(value, "i");
    return listEstacoes.filter((child) => input.test(child.props.value));
  };

  return (
    <Select
      variant={SelectVariant.typeahead}
      //typeAheadAriaLabel="Select a state"
      onToggle={onToggle}
      onSelect={onSelect}
      onClear={clearSelection}
      onFilter={customFilter}
      selections={selected}
      isOpen={isOpen}
      placeholderText={estacao}
      maxHeight={200}
    >
      {listEstacoes}
    </Select>
  );
};

const DatePickerMinMax = ({ value, id }) => {
  const { initialDate, setInitialDate, finalDate, setFinalDate } =
    useContext(filterContext);
  const minDate = new Date(2019, 9, 1);
  const maxDate = new Date(2019, 9, 31);
  const dateFormat = (date) =>
    date
      .toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  const dateParse = (date) => {
    const split = date.split("-");
    if (split.length !== 3) {
      return new Date();
    }
    const day = split[0];
    const month = split[1];
    const year = split[2];
    return new Date(
      `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}T00:00:00`
    );
  };
  const rangeValidator = (date) => {
    if (date < minDate) {
      return "Date is before the allowable range.";
    } else if (date > maxDate) {
      return "Date is after the allowable range.";
    }

    return "";
  };

  const handleClick = (e) => {
    if (id === "initial") {
      setInitialDate(e);
    } else {
      setFinalDate(e);
    }
  };
  return (
    <DatePicker
      value={id === "initial" ? initialDate : finalDate}
      validators={[rangeValidator]}
      onChange={(e) => handleClick(e)}
      dateFormat={dateFormat}
      dateParse={dateParse}
    />
  );
};

const Selecteds = () => {
  const { _initialDateFormat, _finalDateFormat, _codEstacao, dataEstacao } =
    useContext(filterContext);

  const listData = () => {
    if(dataEstacao) {
      const dataList = dataEstacao.map(({DT_MEDICAO, DC_NOME}) => (
        <p>
          {DT_MEDICAO} {DC_NOME}
        </p>
      ))
      console.log('teste')
      return dataList
    }

    return null
  }

  console.log(dataEstacao)
  return (
    <>
      {_codEstacao && (
        <>
          <p>{_codEstacao}</p>
          <p>{_initialDateFormat}</p>
          <p>{_finalDateFormat}</p>
          <section>{listData()}</section>
        </>
      )}
    </>
  );
};

const ButtonFilter = () => {
  const {
    estacao,
    initialDate,
    finalDate,
    setInitialDateFormat,
    setFinalDateFormat,
    setCodEstacao,
  } = useContext(filterContext);

  const dateFormat = (date) => {
    return date.split("-").reverse().join("-");
  };

  const handleClick = () => {
    const initialDateFormat = dateFormat(initialDate);
    const finalDateFormat = dateFormat(finalDate);
    const codEstacao = estacao.slice(0, 4);

    setInitialDateFormat(initialDateFormat);
    setFinalDateFormat(finalDateFormat);
    setCodEstacao(codEstacao);

    console.log("button teste");
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Buscar
    </Button>
  );
};

const FilterForm = () => {
  return (
    <>
      <SelectEstacao />
      <DatePickerMinMax id="initial" />
      <DatePickerMinMax id="final" />
      <ButtonFilter></ButtonFilter>
      <Selecteds />
    </>
  );
};
export default FilterForm;
