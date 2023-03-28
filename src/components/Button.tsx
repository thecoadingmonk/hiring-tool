import type { FC } from "react";
import type { ButtonProps, ButtonStyle } from "../types/Button";

const Button: FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  /**
   * Button style is an object contains all the different classes that can be applied to button
   * contained: this variant will be filled with background color
   * outlined: this variant will only have outline and hallow
   * common: this style will be applied to all the available variants
   */
  const buttonSytle: ButtonStyle = {
    contained: "bg-primary-900 text-white outline-none hover:opacity-90",
    outlined:
      "bg-white text-primary-900 border border-primary-900 hover:shadow-md disabled:shadow-none",
    common:
      "rounded-md py-2 px-4 font-medium text-base transition ease-linear disabled:cursor-not-allowed disabled:opacity-75",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonSytle.common} ${buttonSytle[variant]}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
