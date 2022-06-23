import Layout from "../shared/Layout";
import { useContext } from "react";
import context, { Provider } from "./context";
import filterContext, { FilterProvider } from "./filterContext";
import { useParams } from "react-router-dom";
import FilterForm from "./FilterForm";
import ChartLine from "./ChartLine";
import { ReactQueryDevtools } from "react-query/devtools";
import PlotMapbox from "./PlotMapbox";
import { Grid, GridItem } from "@patternfly/react-core";

const Estacoes = () => {
  const { estacaoId, estacao, estacoesIsLoading, getEstacaoById } =
    useContext(context);

  const { cdEstacao } = useParams();

  if (estacoesIsLoading) {
    return <Layout>Teste 2</Layout>;
  }

  return (
    <Layout filters={<FilterForm />}>
      <Grid>
        <GridItem lg={6}>{<ChartLine />}</GridItem>
        <GridItem lg={6}>{<PlotMapbox />}</GridItem>
      </Grid>
    </Layout>
  );
};

export default () => (
  <Provider>
    <FilterProvider>
      <Estacoes />
      <ReactQueryDevtools />
    </FilterProvider>
  </Provider>
);
