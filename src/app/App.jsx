import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import "./App.css";
import { dataRoutes } from "./dataApp";

const IndexCalendar = lazy(() => import("../pages/calendar/Calendar"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {dataRoutes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
