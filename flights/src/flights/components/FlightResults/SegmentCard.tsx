import type { FC } from "react";
import type { Segment } from "../../models/flightResult.interface";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  segment: Segment;
}

export const SegmentCard: FC<Props> = ({ segment }) => {
  const departureTime = dayjs(segment.departureTime).format("YYYY-MM-DD HH:mm");
  const arrivalTime = dayjs(segment.arrivalTime).format("YYYY-MM-DD HH:mm");

  return (
    <div className="grid grid-cols-6 gap-4 rounded-2xl shadow-lg p-6 bg-white text-gray-800">
      <div className="col-span-3 space-y-3">
        <p className="text-sm text-gray-500 font-medium uppercase">Segment</p>

        <div className="flex items-center gap-3 text-base font-semibold">
          <PlaneTakeoff className="w-5 h-5 text-blue-500" />
          <span>{departureTime} hrs</span>
          <span className="text-gray-400">→</span>
          <PlaneLanding className="w-5 h-5 text-green-500" />
          <span>{arrivalTime} hrs</span>
        </div>

        <p className="text-sm text-gray-700">
          <strong>{segment.departureAirport.name}</strong> (
          {segment.departureAirport.iataCode}) &nbsp;→&nbsp;
          <strong>{segment.arrivalAirport.name}</strong> (
          {segment.arrivalAirport.iataCode})
        </p> 

        <p className="text-sm text-gray-600">
          Airline: <span className="font-medium">{segment.airline.name}</span>
        </p>
      </div>

      <div className="col-span-3 bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-xs text-gray-500 font-medium">
          Travelers fare details
        </p>
        <p className="text-xs font-semibold text-gray-700">{segment.cabin}</p>
        <p className="text-xs text-gray-500 font-medium">
          Amenities:
        </p>

        <ul className="list-disc p-2">
        {
          segment.amenities.map(amenity => (
            <li key={amenity.name} className="text-xs text-gray-600">{`${amenity.name} - (${amenity.isChargeable ? `Chargeable` : "Non-chargeable"})`}</li>

          ))
        }
        </ul>
      </div>
    </div>
  );
};
