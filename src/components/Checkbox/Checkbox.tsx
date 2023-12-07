import React, { useState } from "react";
import { CheckboxWrapper } from "./Checkbox.styles";

const Checkbox = ({
  label,
  name,
  value: propValue,
  onChange,
  isRequired,
}: {
  name: string;
  label?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  isRequired?: boolean;
}) => {
  const [value, setValue] = useState(!!propValue);

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
        checked={!!value}
        onChange={onCheckChange}
      />
      <label htmlFor={name}>{label}</label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
