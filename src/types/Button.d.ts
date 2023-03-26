enum Variant {
  contained = "contained",
  outlined = "outlined",
}

export interface ButtonProps {
  children: string;
  variant: keyof typeof Variant;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export type ButtonStyle = {
  [key in Variant | "common"]: string;
};
