import { InputEvents } from "./Events";

export interface InputTextProps extends InputEvents {
  value: number | string;
  label: string;
  placeholder: string;
  name?: string;
  id?: string;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: number | string | readonly string[];
  ref?: React.Ref<HTMLInputElement> | null;
}
