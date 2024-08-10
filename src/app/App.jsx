import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import LoadingPage from "../components/LoadingPage";

const IndexCalendar = lazy(() => import("../pages/Calendar"));
const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <IndexCalendar />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
