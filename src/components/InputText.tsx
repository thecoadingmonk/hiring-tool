import type { FC } from "react";
import type { InputTextProps } from "../types/InputText";

const InputText: FC<InputTextProps> = ({
  value,
  label,
  placeholder,
  name = "input",
  id = "input",
  errorMessage = "",
  required = false,
  defaultValue,
  ref = null,
  onChange = () => null,
  onBlur = () => null,
}: InputTextProps) => {
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
        type="text"
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
export default InputText;
