import React, { useState } from "react";
import { StyledSelect } from "./Select.styles";

const Select = ({
  label,
  name,
  list,
  defaultValue,
  onChange,
  isRequired,
}: {
  name: string;
  list: {
    label: string;
    value: string;
  }[];
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);

  const onSelectChange = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledSelect
        required={isRequired}
        name={name}
        value={value}
        onChange={onSelectChange}
      >
        {list.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default Select;
