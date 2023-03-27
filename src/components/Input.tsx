import type { FC } from "react";
import type { InputProps } from "../types/Input";

const Input: FC<InputProps> = ({
  value,
  label,
  placeholder,
  type = "text",
  name = "input",
  id = "input",
  errorMessage = "",
  required = false,
  defaultValue,
  ref = null,
  onChange = () => null,
  onBlur = () => null,
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
        value={value}
        type={type}
        className={`border border-gray-20 rounded-[5px] placeholder:text-font-placeholder font-normal text-sm py-2 px-3 w-full ${
          errorMessage ? "focus:outline-font-error" : ""
        }`}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
        defaultValue={defaultValue}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
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
