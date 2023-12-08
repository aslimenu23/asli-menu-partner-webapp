import React, { useState } from "react";
import { StyledInput, StyledInputWrapper } from "./TextInput.styles";
import { InputProps } from "./TextInput.types";
import { checkIfValidInput } from "./TextInput.helpers";

const TextInput = ({
  inputType,
  label,
  name,
  value,
  placeholder = "",
  onChange: onChangeProp,
  isRequired,
  noMargin,
  error,
}: InputProps) => {
  const onChange = (event: any) => {
    const newValue = event.target.value;
    const error = checkIfValidInput(newValue, inputType);

    onChangeProp?.(newValue, error);
  };

  const shouldShowError = isRequired ? error : error && value?.length;

  return (
    <StyledInputWrapper noMargin={noMargin}>
      {label && (
        <label htmlFor={name}>
          {label}
          {isRequired ? "*" : ""}
        </label>
      )}
      <StyledInput
        required={isRequired}
        name={name}
        error={error && value?.length ? true : false}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {shouldShowError ? (
        <div style={{ marginBottom: "10px", color: "red", fontSize: 12 }}>
          {error}
        </div>
      ) : (
        <></>
      )}
    </StyledInputWrapper>
  );
};

export default TextInput;
