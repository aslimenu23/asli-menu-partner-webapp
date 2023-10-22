import React from "react";
import { StyledButton, ButtonContainer } from "./Button.styles";
import { ButtonProps } from "./Button.types";

const Button = React.forwardRef(
  (
    { children, isDisabled, className, onClick, type }: ButtonProps,
    ref: any
  ) => {
    return (
      <ButtonContainer disabled={!!isDisabled} className={className}>
        <StyledButton ref={ref} type={type} onClick={onClick}>
          {children}
        </StyledButton>
      </ButtonContainer>
    );
  }
);

export default Button;
