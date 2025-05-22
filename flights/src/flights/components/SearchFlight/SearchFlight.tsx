import { SearchFlightForm } from "./SearchFlightForm";

export const SearchFlight = () => {
  return (
    <div className="bg-white p-9 text-center shadow-2xl rounded-2xl w-2/3">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Search Flight</h2>
        <p className="text-gray-500 text-sm">
          Find the best deals on flights worldwide
        </p>
      </div>

      <div className="mt-10">
        <SearchFlightForm />
      </div>
    </div>
  );
};
