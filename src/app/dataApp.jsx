import { lazy } from "react";
const IndexCalendar = lazy(() => import("../pages/calendar/IndexCalendar"));
const Error404 = lazy(() => import("../pages/Error404"));

export const dataRoutes = [
  { path: "/", element: <IndexCalendar /> },
  { path: "*", element: <Error404 /> },
];
