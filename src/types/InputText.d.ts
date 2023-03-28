import { InputEvents } from "./Events";

export interface InputTextProps extends InputEvents {
  value?: number | string;
  label: string;
  placeholder?: string;
  name?: string;
  id?: string;
  required?: boolean;
  error?: string;
  defaultValue?: number | string | readonly string[];
}
