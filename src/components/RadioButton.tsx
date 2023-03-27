import type { FC } from "react";
import { RadioButtonProps } from "../types/RadioButton";

const RadioButton: FC<RadioButtonProps> = ({
  checked,
  id,
  name,
  value,
  label,
  ref = null,
  onBlur = () => null,
  onChange = () => null,
}: RadioButtonProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="appearance-none inline-block w-5 h-5 p-0.5 bg-clip-content border-2 border-gray-10 rounded-full checked:bg-primary-900"
        checked={checked}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="ml-1 text-font-placeholder font-normal text-sm"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
