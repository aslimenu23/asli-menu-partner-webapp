import React from "react";
import { StyledButton, ButtonContainer } from "./Button.styles";
import { ButtonProps } from "./Button.types";

const Button = React.forwardRef(
  (
    { children, isDisabled, className, onClick, type }: ButtonProps,
    ref: any
  ) => {
    return (
      <ButtonContainer
        className={className}
        disabled={!!isDisabled}
        onClick={onClick}
      >
        <StyledButton ref={ref} type={type}>
          {children}
        </StyledButton>
      </ButtonContainer>
    );
  }
);

export default Button;
