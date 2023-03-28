enum Variant {
  contained = "contained",
  outlined = "outlined",
}

export interface ButtonProps {
  children: ReactElement;
  variant: keyof typeof Variant;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type ButtonStyle = {
  [key in Variant | "common"]: string;
};
