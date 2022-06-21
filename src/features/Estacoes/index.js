import Layout from "../shared/Layout";
import { useContext } from "react";
import context, { Provider } from "./context";
import filterContext, { FilterProvider } from "./filterContext";
import { useParams } from "react-router-dom";
import FilterForm from "./FilterForm";
import ChartLine from "./ChartLine";

const Estacoes = () => {
  const { estacaoId, estacao, estacoesIsLoading, getEstacaoById } =
    useContext(context);

  const { cdEstacao } = useParams();

  if (estacoesIsLoading) {
    return <Layout>Teste 2</Layout>;
  }

  return (
    <Layout>
      <FilterForm />
      <ChartLine />
    </Layout>
  );
};

export default () => (
  <Provider>
    <FilterProvider>
      <Estacoes />
    </FilterProvider>
  </Provider>
);
