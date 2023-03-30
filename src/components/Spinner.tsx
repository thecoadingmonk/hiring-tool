import { FC } from "react";

interface SpinnerProps {
  className?: string;
}

/**
 * Spinner is used for loading state and if we use it
 * as normal svg with img tag then we might see delay, to avoid
 * that we are directly loading it as JSX
 */
const Spinner: FC<SpinnerProps> = ({ className }: SpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={`animate-spin h-6 w-6 text-primary-900 ${className}`}
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        className="opacity-75"
      ></path>
    </svg>
  );
};

export default Spinner;
