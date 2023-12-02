import React from "react";
import { StyledButton, ButtonContainer } from "./Button.styles";
import { ButtonProps } from "./Button.types";
import Loader from "../Loader/Loader";

const Button = React.forwardRef(
  (
    { children, isDisabled, className, onClick, type, isLoading }: ButtonProps,
    ref: any
  ) => {
    return (
      <ButtonContainer
        className={className}
        disabled={!!isDisabled}
        isLoading={isLoading}
        onClick={onClick}
      >
        <StyledButton ref={ref} type={type}>
          {isLoading ? <Loader isSmall /> : children}
        </StyledButton>
      </ButtonContainer>
    );
  }
);  

export default Button;
