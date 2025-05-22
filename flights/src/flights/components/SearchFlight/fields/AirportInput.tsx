

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import type { Airport } from "../../../models";
import { useGetAirportsQuery } from "../../../../redux/api/flightsApi";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue";
import { Controller, type Control, type FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: "departureAirport" | "arrivalAirport";
  control: Control<any>;
  error?: FieldError;
}

export const AirportInput = ({ label, name, control, error }: Props) => {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 400);

  const { data: airports = [] } = useGetAirportsQuery(
    { name: debounced },
    { skip: debounced.length < 3 }
  );

  return (
    <div className="flex flex-col relative">
      <label className="text-left text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Required" }}
        render={({ field }) => {
          const selectedAirport = airports.find((a : any) => a.iataCode === field.value);

          return (
            <Combobox value={selectedAirport ?? null} onChange={(val) => {
              field.onChange(val.iataCode);  
              setQuery(val.name);            
            }}>
              <div className="relative">
                <Combobox.Input
                  className={`border w-full ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  displayValue={(airport: Airport) => airport?.name || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {airports.length > 0 && (
                  <Combobox.Options className="absolute z-10 bg-white border rounded mt-1 max-h-48 overflow-auto w-full shadow">
                    {airports.map((airport : any) => (
                      <Combobox.Option
                        key={airport.iataCode}
                        value={airport}
                        className={({ active }) =>
                          `cursor-pointer px-4 py-2 text-sm ${
                            active ? "bg-indigo-100" : ""
                          }`
                        }
                      >
                        {airport.name} ({airport.iataCode} - {airport.city} ) 
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          );
        }}
      />

      {error && (
        <span className="text-left p-2 text-red-500 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
};
