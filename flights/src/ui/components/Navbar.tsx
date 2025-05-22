import { DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../../redux";
import { selectCurrency } from "../../redux/slices/currencySlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.currency);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectCurrency(e.target.value as "USD" | "MXN" | "EUR"));
  };
  return (
    <nav className="fixed top-0 w-full border-b border-gray-200 bg-white py-3 z-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <Link className="flex items-center mb-2 lg:mb-0" to="/">
            <img src="/encora-logo.webp" className="w-12 h-12" alt="Logo" />
            <p className="font-bold text-inherit ml-4">Encora Flights</p>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center">
              <DollarSign className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-gray-700">Currency:</p>
            </div>

            <div className="relative ">
              <select
                id="currency"
                className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-full px-5 py-2 shadow-md text-sm font-semibold text-gray-700 transition duration-200 ease-in-out hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currency}
                onChange={handleChange}
              >
                <option value="USD">🇺🇸 USD</option>
                <option value="MXN">🇲🇽 MXN</option>
                <option value="EUR">🇪🇺 EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
