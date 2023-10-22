export type ButtonProps = {
  children: any;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
};
