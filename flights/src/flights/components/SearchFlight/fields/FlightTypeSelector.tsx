interface Props {
  flightType: "one-way" | "round-trip";
  setFlightType: (type: "one-way" | "round-trip") => void;
}

export const FlightTypeSelector = ({ flightType, setFlightType }: Props) => (
  <div className="flex gap-6">
    {["one-way", "round-trip"].map((type) => {
      const id = `flightType-${type}`;

      return (
        <label
          key={type}
          className="inline-flex items-center gap-2 cursor-pointer"
          htmlFor={id}
        >
          <input
            id={id}
            type="radio"
            name="flightType"
            value={type}
            checked={flightType === type}
            onChange={() => setFlightType(type as "one-way" | "round-trip")}
            className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
          />
          <span className="text-sm text-gray-700 capitalize">
            {type.replace("-", " ")}
          </span>
        </label>
      );
    })}
  </div>
);
