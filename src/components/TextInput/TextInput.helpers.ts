import { InputTypes } from "./TextInput.types";

export const checkIfValidInput = (value: any, inputType?: InputTypes) => {
  switch (inputType) {
    case InputTypes.MOBILE:
      const mobilePattern =
        /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
      const isValidMobile = value.match(mobilePattern);
      return isValidMobile ? "" : `Invalud mobile number`;
    case InputTypes.OTP:
      const otpPattern = /^\d{6}$/;
      const isValidOtp = value.match(otpPattern);
      return isValidOtp ? "" : `Invalud OTP`;
    case InputTypes.NUMBER:
      const numberPattern = /^\d+$/;
      const isValidNumber = value.match(numberPattern);
      return isValidNumber ? "" : `Invalud number`;
    default:
      return "";
  }
};
