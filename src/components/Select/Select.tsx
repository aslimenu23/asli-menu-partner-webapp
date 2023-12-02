import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const CustomSelect = ({
  label,
  name,
  list,
  value,
  validationError,
  isCreatable,
  isMulti,
  onChange,
}: {
  name: string;
  list: {
    label: string;
    value: string;
  }[];
  label: string;
  value: string | any[];
  onChange: (value: string | any[]) => void;
  isRequired?: boolean;
  isCreatable?: boolean;
  isMulti?: boolean;
  validationError?: string;
}) => {
  const [localState, setLocalState] = useState(value);

  const onSelectChange = (selectValues: any | any[]) => {
    setLocalState(selectValues);
    onChange(selectValues);
  };

  const SelectComponent = isCreatable ? CreatableSelect : Select;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <SelectComponent
        name={name}
        value={localState}
        options={list as readonly any[]}
        onChange={onSelectChange}
        isMulti={isMulti}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "30px",
          }),
        }}
      />
      {validationError ? (
        <div style={{ margin: "10px 0", color: "red", fontSize: 12 }}>
          {validationError}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomSelect;
