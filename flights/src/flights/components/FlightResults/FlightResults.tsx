import { FlightCard } from "./FlightCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import type { FlightResponse } from "../../models";
import type { FC } from "react";

interface Props {
  flights: FlightResponse;
}

export const FlightResults: FC<Props> = ({ flights }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const isRoundTrip = params.has("returnDate");
  const nonStop = params.get("nonStop") === "true";

  if (!flights.results || !Array.isArray(flights.results)) {
    return <p className="mt-4 text-center">No flights found.</p>;
  }

  let filteredResults: FlightResponse["results"] = [];

  if (isRoundTrip && nonStop && flights.results.length === 2) {
    filteredResults = [flights.results[0]];
  } else if (isRoundTrip && !nonStop) {
    const grouped: FlightResponse["results"] = [];
    const used = new Set<number>();

    for (let i = 0; i < flights.results.length; i++) {
      if (used.has(i)) continue;

      const current = flights.results[i];

      for (let j = i + 1; j < flights.results.length; j++) {
        if (used.has(j)) continue;

        const candidate = flights.results[j];
        const currentLast = current.segments[current.segments.length - 1];
        const candidateFirst = candidate.segments[0];

        if (
          currentLast.arrivalAirport.iataCode ===
          candidateFirst.departureAirport.iataCode
        ) {
          grouped.push({
            ...current,
            segments: [...current.segments, ...candidate.segments],
          });
          used.add(i);
          used.add(j);
          break;
        }
      }

      if (!used.has(i)) {
        grouped.push(current); 
        used.add(i);
      }
    }

    filteredResults = grouped;
  } else {
    filteredResults = flights.results;
  }

  return (
    <div>
      <button
        type="button"
        className="mt-4 flex gap-4 justify-center items-center py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-lg cursor-pointer font-semibold shadow-xs transition-all duration-500 hover:bg-indigo-700"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4" />
        Return to search
      </button>

      
      {filteredResults.map((result, index) => (
        <FlightCard
          flight={result}
          key={index}
          {...(isRoundTrip ? { returnFlight: flights.results[flights.results.length - 1] } : {})}        />
      ))}
    </div>
  );
};

