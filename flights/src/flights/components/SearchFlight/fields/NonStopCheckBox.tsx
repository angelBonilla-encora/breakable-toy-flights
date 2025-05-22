import type { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
}

export const NonStopCheckbox = ({ register }: Props) => (
  <div className="flex items-center space-x-3">
    <input
      id="nonStop"
      type="checkbox"
      {...register("nonStop")}
      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label htmlFor="nonStop" className="text-sm text-gray-700">
      Non-stop
    </label>
  </div>
);
