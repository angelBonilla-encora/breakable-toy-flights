import { useSelector, useDispatch } from "react-redux";
import { selectCurrency } from "../../../../redux/slices/currencySlice";
import type { RootState } from "../../../../redux";

export const CurrencySelect = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <label className="text-left text-sm font-medium text-gray-700 mb-1">Currency</label>
      <select
        value={currency}
        onChange={(e) => dispatch(selectCurrency(e.target.value))}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="USD">🇺🇸 USD</option>
        <option value="MXN">🇲🇽 MXN</option>
        <option value="EUR">🇪🇺 EUR</option>
      </select>
    </div>
  );
};
