import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  AirportInput,
  CurrencySelect,
  DateInput,
  FlightTypeSelector,
  NonStopCheckbox,
  NumberOfAdultsInput,
} from "./fields";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

interface FormData {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: Date;
  returnDate?: Date;
  numberOfAdults: number;
  nonStop: boolean;
}

export const SearchFlightForm = () => {
  const [flightType, setFlightType] = useState<"one-way" | "round-trip">(
    "one-way"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      numberOfAdults: 1,
      nonStop: true,
    },
  });

  const departureDateValue = watch("departureDate");


  const onSubmit = (data: FormData) => {
    const paramsObj = {
      originAirportCode: data.departureAirport,
      destinationAirportCode: data.arrivalAirport,
      departureDate: dayjs(data.departureDate).format("YYYY-MM-DD"),
      numberOfAdults: data.numberOfAdults.toString(),
      nonStop: data.nonStop ? "true" : "false",
      ...(data.returnDate
        ? { returnDate: dayjs(data.returnDate).format("YYYY-MM-DD") }
        : {}),
    };
    
    const params = new URLSearchParams(paramsObj);
    
   
    navigate(`/search-flights?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <FlightTypeSelector
        flightType={flightType}
        setFlightType={setFlightType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AirportInput
          label="Departure Airport"
          name="departureAirport"
          control={control}
          // register={register}
          error={errors.departureAirport}
        />
        <AirportInput
          label="Arrival Airport"
          name="arrivalAirport"
          control={control}

          // register={register}
          error={errors.arrivalAirport}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput
          label="Departure Date"
          register={register("departureDate", {
            required: "Departure date is required",
            validate: (value) => {
              const today = dayjs().startOf("day");
              const depDate = dayjs(value);
              if (depDate.isBefore(today)) {
                return "Departure date cannot be before today";
              }
              return true;
            },
          })}
          error={errors.departureDate}
        />
        {flightType === "round-trip" && (
          <DateInput
            label="Return Date"
            register={register("returnDate", {
              required:"Return date is required",
              validate: (value) => {
                if (!value) return true;
                const retDate = dayjs(value);
                const depDate = dayjs(departureDateValue);
                if (retDate.isBefore(depDate)) {
                  return "Return date cannot be before departure date";
                }
                return true;
              },
            })}
            error={errors.returnDate}
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="w-1/4">
          <CurrencySelect />
        </div>

        <div className="w-1/4">
          <NumberOfAdultsInput
            register={register}
            error={errors.numberOfAdults}
          />
        </div>
      </div>

      <NonStopCheckbox register={register} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
        >
          <Search className="w-5 h-5" />
          Search Flights
        </button>
      </div>
    </form>
  );
};
