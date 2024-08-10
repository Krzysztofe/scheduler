import { lazy } from "react";
const Calendar = lazy(() => import("../pages/calendar/Calendar"));
const Error404 = lazy(() => import("../pages/Error404"));

export const dataRoutes = [
  { path: "/", element: <Calendar /> },
  { path: "*", element: <Error404 /> },
];
