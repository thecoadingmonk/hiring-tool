export interface InputProps {
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  required?: boolean;
  errorMessage?: string;
}