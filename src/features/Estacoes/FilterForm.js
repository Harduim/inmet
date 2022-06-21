import React, { useContext, useEffect, useState } from "react";
import context from "./context";
import filterContext from "./filterContext";

import {
  Select,
  SelectOption,
  SelectVariant,
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
      width={400}
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

const SelectAtributo = () => {
  const { atributo, setAtributo } = useContext(filterContext);
  const [isOpen, setOpen] = useState(null);
  const [selected, setSelected] = useState(null);

  const listAtributos = [
    <SelectOption
      datakey="CHUVA"
      key="CHUVA"
      value="Precipitação Total"
      unidade="mm"
    />,
    <SelectOption
      datakey="TEMP_MAX"
      key="TEMP_MAX"
      value="Temperatura Máxima"
      unidade="°C"
    />,
    <SelectOption
      datakey="TEMP_MED"
      key="TEMP_MED"
      value="Temperatura Média"
      unidade="°C"
    />,
    <SelectOption
      datakey="TEMP_MIN"
      key="TEMP_MIN"
      value="Temperatura Mínima"
      unidade="°C"
    />,
    <SelectOption
      datakey="UMID_MED"
      key="UMID_MED"
      value="Umidade Relativa do Ar Média"
      unidade="%"
    />,
    <SelectOption
      datakey="UMID_MIN"
      key="UMID_MIN"
      value="Umidade Relativa do Ar Mínima"
      unidade="%"
    />,
    <SelectOption
      datakey="VEL_VENTO_MED"
      key="VEL_VENTO_MED"
      value="Vento Velocidade Média"
      unidade="m/s"
    />,
  ];

  const onToggle = (isOpen) => setOpen(isOpen);
  const onSelect = (event, selection, isPlaceHolder) => {
    if (isPlaceHolder) clearSelection();
    else {
      setSelected(selection);
      setAtributo(event.target.getAttribute("datakey"));
      setOpen(false);
    }
  };

  const clearSelection = () => {
    setSelected(null);
    setOpen(false);
  };

  const customFilter = (_, value) => {
    if (!value) {
      return listAtributos;
    }

    const input = new RegExp(value, "i");
    return listAtributos.filter((child) => input.test(child.props.value));
  };

  return (
    <Select
      variant={SelectVariant.typeahead}
      typeAheadAriaLabel="Selecione o atributo"
      onToggle={onToggle}
      onSelect={onSelect}
      onClear={clearSelection}
      onFilter={customFilter}
      selections={selected}
      isOpen={isOpen}
      placeholderText={atributo}
      maxHeight={200}
      width={200}
    >
      {listAtributos}
    </Select>
  );
};

const ButtonFilter = () => {
  const {
    estacao,
    initialDate,
    finalDate,
    dataEstacao,
    atributo,
    atributoFinal,
    setInitialDateFormat,
    setFinalDateFormat,
    setCodEstacao,
    setAtributo,
    setAtributoFinal,
    validador,
    setValidador,
  } = useContext(filterContext);

  const dateFormat = (date) => {
    return date.split("-").reverse().join("-");
  };

  const newDate = (date) => {
    const arrDate = date.split('-')

    return new Date ([arrDate[1],arrDate[0],arrDate[2]].join('-'))
  }
  const validarDatas = () => {
    const day1 = newDate(initialDate)
    const day2 = newDate(finalDate)

    console.log(day2 - day1)
    setValidador((day2 - day1) > 0)
  }

  // const validar = () => {
  //   if(estacao && atributo && )
  // }

  const handleClick = () => {
    const initialDateFormat = dateFormat(initialDate);
    const finalDateFormat = dateFormat(finalDate);
    const codEstacao = estacao.slice(0, 4);

    setInitialDateFormat(initialDateFormat);
    setFinalDateFormat(finalDateFormat);
    setCodEstacao(codEstacao);
    setAtributoFinal(atributo);
    validarDatas()
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
      <SelectAtributo />
      <DatePickerMinMax id="initial" />
      <DatePickerMinMax id="final" />
      <ButtonFilter></ButtonFilter>
    </>
  );
};
export default FilterForm;
