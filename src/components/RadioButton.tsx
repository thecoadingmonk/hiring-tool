import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { RadioButtonProps } from "../types/RadioButton";

const RadioButton: ForwardRefRenderFunction<
  HTMLInputElement,
  RadioButtonProps
> = (props, ref) => {
  return (
    <div className="flex items-center">
      <input
        ref={ref}
        type="radio"
        className="appearance-none inline-block w-5 h-5 p-0.5 bg-clip-content border-2 border-gray-10 rounded-full checked:bg-primary-900"
        {...props}
      />
      <label
        htmlFor={props.id}
        className="ml-1 text-font-placeholder font-normal text-sm"
      >
        {props.label}
      </label>
    </div>
  );
};

export default forwardRef(RadioButton);
