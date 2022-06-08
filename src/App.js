import React from "react";
import { ReactDOM } from "react";
import { useParams } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/home";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyRoutes, BlogPost } from "./pages/routes";
import EstacaoProvider from "./context/EstacaoContext";

const queryClient = new QueryClient();

function App() {
  return (
    <EstacaoProvider>
      <QueryClientProvider client={queryClient}>
        <MyRoutes />
      </QueryClientProvider>
    </EstacaoProvider>
  );
}

export default App;
