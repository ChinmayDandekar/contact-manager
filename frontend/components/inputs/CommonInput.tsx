"use client";

import { InputType } from "@/lib/types";

type CommonInputProps<T> = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  value: T;
  error?: string | undefined;
  onChange: (
    name: string,
    value: T,
    type?: React.HTMLInputTypeAttribute
  ) => void;
  className?: string;
  disabled?: boolean;
  errorClassName?: string;
  labelClassName?: string;
};

const CommonInput = <T extends InputType>({
  name,
  label,
  type,
  error,
  value,
  onChange,
  disabled,
  className,
  labelClassName,
  errorClassName,
}: CommonInputProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value as T, type);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <label
        htmlFor={name}
        className={` text-black font-medium capitalize text-xs md:text-sm ${labelClassName}`}
      >
        {label}
      </label>
      <input
        className={`outline-none border border-solid border-gray-300 text-sm rounded-xl shadow-sm px-2 text-[10px] md:text-xs py-1 md:py-2 ${className} ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        name={name}
        type={type}
        value={
          type == "number"
            ? value?.toString().replace(/^0+(?!$)/, "")
            : (value as InputType)
        }
        disabled={disabled}
        onChange={handleChange}
      />
      <p
        className={`text-xs text-red-500 uppercase font-medium ${errorClassName}`}
      >
        {error}
      </p>
    </div>
  );
};

export default CommonInput;
