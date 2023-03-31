// Library
import React, { forwardRef, ForwardRefRenderFunction } from "react";

// Types
import type { InputTextProps } from "../types/InputText";

const InputText: ForwardRefRenderFunction<HTMLInputElement, InputTextProps> = (
  props,
  ref
) => {
  const {
    value,
    label,
    name = "",
    error = "",
    required = false,
    onChange = () => null,
    onBlur = () => null,
  } = props;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        data-content="*"
        className={`${
          required ? "after:content after:text-font-error" : ""
        } font-medium text-sm text-font-dark mb-1 sm:empty:mb-6`}
      >
        {label}
      </label>
      <input
        {...props}
        value={value}
        type="text"
        className={`border border-gray-20 rounded-[5px] placeholder:text-font-placeholder font-normal text-sm py-2 px-3 w-full ${
          error ? "focus:outline-font-error" : ""
        }`}
        required={false}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      <p
        className={`text-font-error text-xs mt-0.5 ${
          error ? "visible" : "invisible"
        }`}
      >
        {error}
      </p>
    </div>
  );
};
export default forwardRef(InputText);
