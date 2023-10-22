import React, { useState } from "react";
import { CheckboxWrapper } from "./Checkbox.styles";

const Checkbox = ({
  label,
  name,
  defaultValue,
  onChange,
  isRequired,
}: {
  name: string;
  label?: string;
  defaultValue?: string;
  onChange?: (value: boolean) => void;
  isRequired?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue || "false");

  const onCheckChange = (event: any) => {
    setValue(event.target.checked);
    onChange?.(event.target.checked);
  };

  return (
    <CheckboxWrapper>
      <input
        required={isRequired}
        name={name}
        type="checkbox"
        value={value}
        onChange={onCheckChange}
      />
      <label htmlFor={name}>{label}</label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
