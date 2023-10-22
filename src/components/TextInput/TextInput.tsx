import React, { useState } from "react";
import { StyledInput, StyledInputWrapper } from "./TextInput.styles";
import { InputProps } from "./TextInput.types";
import { checkIfValidInput } from "./TextInput.helpers";

const TextInput = ({
  inputType,
  label,
  name,
  defaultValue,
  placeholder = "",
  onChange: onChangeProp,
  isRequired,
  noMargin,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  const onChange = (event: any) => {
    const newValue = event.target.value;
    const isValid = checkIfValidInput(newValue, inputType);

    setValue(newValue);
    onChangeProp?.(newValue, isValid);

    if (isValid) {
      setError(false);
    } else setError(true);
  };

  return (
    <StyledInputWrapper noMargin={noMargin}>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInput
        required={isRequired}
        name={name}
        error={error && value?.length ? true : false}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledInputWrapper>
  );
};

export default TextInput;
