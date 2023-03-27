import type { FC } from "react";
import type { RadioGroupProps } from "../types/RadioGroup";
import RadioButton from "./RadioButton";

const RadioGroup: FC<RadioGroupProps> = ({
  legend,
  items,
  flow = "vertical",
}: RadioGroupProps) => {
  return (
    <>
      <legend className="mb-3 font-medium text-sm text-font-dark">
        {legend}
      </legend>
      <fieldset
        className={`inline-grid gap-4 ${
          flow === "vertical"
            ? "grid-flow-row"
            : "grid-flow-row xsm:grid-flow-col"
        }`}
      >
        {items.map((props) => (
          <RadioButton {...props} />
        ))}
      </fieldset>
    </>
  );
};

export default RadioGroup;
