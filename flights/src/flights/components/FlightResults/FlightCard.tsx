
import { PlaneTakeoff, PlaneLanding, Clock, DollarSign } from "lucide-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState, type FC } from "react";
import type { FlightResult } from "../../models";
import { FlightDetailsModal } from "./FlightDetailsModal";

dayjs.extend(duration);

interface Props {
  flight: FlightResult;
  returnFlight?: FlightResult; 
}

export const FlightCard: FC<Props> = ({ flight, returnFlight }) => {
  const [isOpen, setIsOpen] = useState(false);

  const firstSegment = flight.segments[0];
  const lastSegment = flight.segments[flight.segments.length - 1];
  const departureTime = dayjs(firstSegment.departureTime).format("HH:mm");
  const arrivalTime = dayjs(lastSegment.arrivalTime).format("HH:mm");
  const departureDate = dayjs(firstSegment.departureTime).format("MMM DD, YYYY");
  const durationFormatted = dayjs.duration(flight.totalDuration).format("H[h] m[m]");

  const returnFirstSegment = returnFlight?.segments[0];
  const returnLastSegment = returnFlight?.segments[returnFlight.segments.length - 1];
  const returnDepartureTime = returnFirstSegment ? dayjs(returnFirstSegment.departureTime).format("HH:mm") : null;
  const returnArrivalTime = returnLastSegment ? dayjs(returnLastSegment.arrivalTime).format("HH:mm") : null;
  const returnDate = returnFirstSegment ? dayjs(returnFirstSegment.departureTime).format("MMM DD, YYYY") : null;
  const returnDurationFormatted = returnFlight ? dayjs.duration(returnFlight.totalDuration).format("H[h] m[m]") : null;

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="mt-10 cursor-pointer bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-6 gap-6 transition duration-300 hover:scale-101 hover:shadow-2xl"
    >
      <div className="md:col-span-4 space-y-2 text-lg text-gray-800">
        <h3 className="font-semibold mb-2">Departure Flight</h3>
        <div className="flex items-center gap-3 font-semibold">
          <PlaneTakeoff className="w-5 h-5 text-blue-500" />
          <span>{departureTime} hrs</span>
          <span>→</span>
          <PlaneLanding className="w-5 h-5 text-green-500" />
          <span>{arrivalTime} hrs</span>
        </div>
        <p className="text-base text-gray-700">
          {`${firstSegment.departureAirport.name} (${firstSegment.departureAirport.iataCode}) → ${lastSegment.arrivalAirport.name} (${lastSegment.arrivalAirport.iataCode})`}
        </p>
        <p className="text-base text-gray-600">Airline: {firstSegment.airline.code}</p>
        <p className="text-sm text-gray-500">{departureDate}</p>
      </div>

      <div className="flex md:flex-col items-start gap-2 text-lg text-gray-800">
        <div className="flex items-center gap-1">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Duration:</span>
        </div>
        <span className="font-semibold">{durationFormatted}</span>
      </div>

      <div className="text-right space-y-3">
        <div className="flex justify-end items-center gap-1 text-gray-800">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-lg font-bold">{`${flight.totalPrice.totalPrice} ${flight.totalPrice.currency}`}</span>
        </div>
        <p className="text-sm text-gray-500">Total</p>

        <div className="flex justify-end items-center gap-1 text-gray-800">
          <DollarSign className="w-4 h-4 text-blue-600" />
          <span className="text-lg font-bold">{`${flight.pricePerTraveler.totalPrice} ${flight.pricePerTraveler.currency}`}</span>
        </div>
        <p className="text-sm text-gray-500">Per traveler</p>
      </div>

      {returnFlight && (
        <>
          <div className="md:col-span-4 space-y-2 text-lg text-gray-800 border-t border-gray-200 pt-6 mt-6">
            <h3 className="font-semibold mb-2">Return Flight</h3>
            <div className="flex items-center gap-3 font-semibold">
              <PlaneTakeoff className="w-5 h-5 text-blue-500" />
              <span>{returnDepartureTime} hrs</span>
              <span>→</span>
              <PlaneLanding className="w-5 h-5 text-green-500" />
              <span>{returnArrivalTime} hrs</span>
            </div>
            <p className="text-base text-gray-700">
              {`${returnFirstSegment?.departureAirport.name} (${returnFirstSegment?.departureAirport.iataCode}) → ${returnLastSegment?.arrivalAirport.name} (${returnLastSegment?.arrivalAirport.iataCode})`}
            </p>
            <p className="text-base text-gray-600">Airline: {returnFirstSegment?.airline.code}</p>
            <p className="text-sm text-gray-500">{returnDate}</p>
          </div>

          <div className="flex md:flex-col items-start gap-2 text-lg text-gray-800 border-t border-gray-200 pt-3 mt-6">
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Duration:</span>
            </div>
            <span className="font-semibold">{returnDurationFormatted}</span>
          </div>
        </>
      )}

      <FlightDetailsModal isOpen={isOpen} onClose={() => setIsOpen(false)} flight={flight} />
    </div>
  );
};
