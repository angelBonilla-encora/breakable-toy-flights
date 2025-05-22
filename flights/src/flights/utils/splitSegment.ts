import type { FlightResult } from "../models/flightResult.interface";

export const splitSegmentsByRoute = (segments: FlightResult['segments']) => {
  if (!segments || segments.length === 0) return { departureSegments: [], returnSegments: [] };

  const sorted = [...segments].sort(
    (a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  );

  const originAirportCode = sorted[0].departureAirport.iataCode;
  const destinationAirportCode = sorted[0].arrivalAirport.iataCode;

  const departureSegments = sorted.filter(s => s.departureAirport.iataCode === originAirportCode);
  const returnSegments = sorted.filter(s => s.departureAirport.iataCode === destinationAirportCode);

  return { departureSegments, returnSegments };
};
