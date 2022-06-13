const placeholderData = () => {
  let date = 1;
  let propData = [];

  for (let i = 0; i <= 30; i++) {
    propData.push({
      DC_NOME: "--",
      DT_MEDICAO: `2019-10-${date}`,
      TEMP_MAX: "0",
      CD_ESTACAO: `---`,
    });
    date++;
  }

  return propData;
};

export default placeholderData();
