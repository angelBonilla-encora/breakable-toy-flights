import { Route, Routes } from "react-router";
import { FlightRoutes } from "../flights/router/FlightRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<FlightRoutes />} />
    </Routes>
  );
};
