export type InputProps = {
  name: string;
  onChange?: (value: any, isValid?: boolean) => void;
  label?: string;
  inputType?: InputTypes;
  defaultValue?: any;
  placeholder?: string;
  isRequired?: boolean;
  noMargin?: boolean;
};

export enum InputTypes {
  MOBILE = "mobile",
  OTP = "otp",
  NUMBER = "number",
}
