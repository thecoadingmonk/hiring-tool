import { RadioButtonProps } from "./RadioButton";

export interface RadioGroupProps {
  legend: string;
  items: RadioButtonProps[];
  flow?: "vertical" | "horizontal";
}
