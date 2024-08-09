import React, { Suspense, lazy } from "react";
import "./App.css";
import LoadingPage from "../pages/loadingPage/LoadingPage";
import Calendar from "../pages/Calendar";

const IndexCalendar = lazy(() => import("../pages/Calendar"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <IndexCalendar />
    </Suspense>
  );
}

export default App;
