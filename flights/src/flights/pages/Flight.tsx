import { UserLayout } from "../../layouts/UserLayout";
import { FlightResults } from "../components/FlightResults";
import { useSelector } from "react-redux";
import { useGetFlightsQuery } from "../../redux/api/flightsApi";
import { LoadingFlight } from "../../ui/components";
import { useSearchParams } from "react-router";
import type { RootState } from "../../redux";
// import { dataNo } from "../data/data";

 const Flights = () => {
  const [params] = useSearchParams();
  const currency = useSelector((state: RootState) => state.currency.currency);

  console.log(import.meta.env.VITE_API_URL)

  const queryArgs = {
    originAirportCode: params.get("originAirportCode") ?? "",
    destinationAirportCode: params.get("destinationAirportCode") ?? "",
    departureDate: params.get("departureDate") ?? "",
    returnDate: params.get("returnDate"),
    numberOfAdults: params.has("numberOfAdults")
  ? Number(params.get("numberOfAdults"))
  : 1,
    nonStop: params.get("nonStop") === "true",
    currency,
  };



      const { data, isLoading, error } = useGetFlightsQuery(queryArgs);
  
  console.log(data)
  return (
    <UserLayout withContainer>
        {isLoading && <LoadingFlight />}
        {error && <p>Error</p>}
        {data?.results && <FlightResults flights={data} />}


    </UserLayout>
  );
};

export default Flights;
