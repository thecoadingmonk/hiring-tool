export interface InputProps extends InputEvents {
  value: number | string;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: number | string | readonly string[];
  ref?: React.Ref<HTMLInputElement> | null;
}

export interface InputEvents {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
