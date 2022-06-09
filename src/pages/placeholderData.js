const placeholderData = () => {
  let date = 1;
  let cdEstacao = 301;
  let propData = [];

  for (let i = 0; i <= 30; i++) {
    propData.push({
      DC_NOME: "ARQ.SÃO PEDRO E SÃO PAULO",
      DT_MEDICAO: `2019-10-${date}`,
      TEMP_MAX: "0",
      CD_ESTACAO: `A${cdEstacao}`,
    });
    date++;
  }

  return propData;
};

export default placeholderData();
