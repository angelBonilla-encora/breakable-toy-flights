import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FC } from "react";
import type { FlightResult } from "../../models";
import { PriceCard, SegmentCard } from ".";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  flight: FlightResult | null;
}

export const FlightDetailsModal: FC<Props> = ({ isOpen, onClose, flight }) => {
  if (!flight) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 max-w-7xl w-full shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">
            Flight Details
          </DialogTitle>
          <div className="grid grid-cols-6 gap-6 p-12">
            <div className="col-span-4">
              {flight.segments.map((segment) => (
                <SegmentCard segment={segment} />
              ))}
            </div>
            <div className="col-span-2">
              <PriceCard
                totalPrice={flight.totalPrice}
                pricePerTraveler={flight.pricePerTraveler}
              />
            </div>
          </div>

          <div className="p-12 flex justify-end">
            <button
              type="submit"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
            >
              Close Details
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
