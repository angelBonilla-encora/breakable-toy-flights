import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Flights from "../pages/Flight";
import { NotFound } from "../../ui/components/NotFound";

export const FlightRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-flights" element={<Flights />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
