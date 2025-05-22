import type { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const NumberOfAdultsInput = ({ register, error }: Props) => (
  <div className="flex flex-col">
    <label className="text-left text-sm font-medium text-gray-700 mb-1">
      Number of Adults
    </label>
    <input
      type="number"
      min={1}
      {...register("numberOfAdults", {
        required: "Required",
        min: { value: 1, message: "Must be at least 1" },
      })}
      className={`border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);
