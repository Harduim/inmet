import Layout from "../shared/Layout";
import { useContext } from "react";
import context, { Provider } from "./context";
import { FilterProvider } from "./filterContext";
import FilterForm from "./FilterForm";
import ChartLine from "./ChartLine";
import { ReactQueryDevtools } from "react-query/devtools";
import PlotMapbox from "./PlotMapbox";
import { Grid, GridItem } from "@patternfly/react-core";

const Estacoes = () => {
  const { estacoesIsLoading } = useContext(context);

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

const index = () => (
  <Provider>
    <FilterProvider>
      <Estacoes />
      <ReactQueryDevtools />
    </FilterProvider>
  </Provider>
);

export default index;
