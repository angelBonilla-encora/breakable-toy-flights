import type { FC } from "react";
import type { CurrencyAmount } from "../../models";

interface Props {
  totalPrice: CurrencyAmount;
  pricePerTraveler: CurrencyAmount;
}

export const PriceCard: FC<Props> = ({ totalPrice, pricePerTraveler }) => {
  return (
    <div className="shadow-lg rounded-2xl p-6 bg-white text-gray-800 space-y-4">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Price Breakdown (Total)
        </p>
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-gray-600">Base:</span>{" "}
            <span className="font-normal">{totalPrice.basePrice}</span>
          </p>
          <p>
            <span className="text-gray-600">Fees:</span>{" "}
            <span className="font-normal">{totalPrice.fees}</span>
          </p>
          <p className="font-bold">
            <span className="text-gray-600">Total:</span>{" "}
            <span>
              {totalPrice.totalPrice} {totalPrice.currency}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Per Traveler
        </p>
        <p>
          <span className="text-gray-600">Base:</span>{" "}
          <span className="font-normal">{pricePerTraveler.basePrice}</span>
        </p>
        <p>
          <span className="text-gray-600">Fees:</span>{" "}
          <span className="font-normal">{pricePerTraveler.fees}</span>
        </p>
        <p className="font-bold">
          <span className="text-gray-600">Total:</span>{" "}
          <span>
            {pricePerTraveler.totalPrice} {pricePerTraveler.currency}
          </span>
        </p>
      </div>
    </div>
  );
};
