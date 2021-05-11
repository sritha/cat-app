import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PageLayout } from "./components/PageLayout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "./components/Router";
import { CatsContextProvider } from "./components/CatsContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CatsContextProvider>
          <PageLayout>
            <Router />
          </PageLayout>
        </CatsContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
