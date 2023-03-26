import type { FC } from "react";
import type { InputProps } from "../types/Input";

const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  name = "input",
  id = "input",
  errorMessage = "",
  required = false,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        data-content="*"
        className={`${
          required ? "after:content after:text-font-error" : ""
        } font-medium text-sm text-font-dark`}
      >
        {label}
      </label>
      <input
        type={type}
        className={`border border-gray-20 rounded-[5px] placeholder:text-font-placeholder font-normal text-sm py-2 px-3 w-full ${
          errorMessage ? "focus:outline-font-error" : ""
        }`}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
      />
      <p
        className={`text-font-error text-xs mt-0.5 ${
          errorMessage ? "visible" : "invisible"
        }`}
      >
        {errorMessage}
      </p>
    </>
  );
};

export default Input;
