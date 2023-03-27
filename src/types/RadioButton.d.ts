import { InputEvents } from "./Events";

export interface RadioButtonProps extends InputEvents {
  checked: boolean;
  id: string;
  name: string;
  value: string;
  label: string;
  ref?: React.Ref<HTMLInputElement> | null;
}
