import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const DateInput = ({ label, register, error }: Props) => (
  <div className="flex flex-col">
    <label htmlFor={register.name} className="text-left text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={register.name}
      type="date"
      {...register}
      className={`border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    />
    {error && (
      <span className="text-left p-2 text-red-500 text-sm">
        {error.message}
      </span>
    )}
  </div>
);
