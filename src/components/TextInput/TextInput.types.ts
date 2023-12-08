export type InputProps = {
  name: string;
  value: any;
  onChange: (value: any, error: string) => void;
  label?: string;

  inputType?: InputTypes;
  placeholder?: string;
  isRequired?: boolean;
  noMargin?: boolean;
  error?: string;
};

export enum InputTypes {
  MOBILE = "mobile",
  OTP = "otp",
  NUMBER = "number",
}
