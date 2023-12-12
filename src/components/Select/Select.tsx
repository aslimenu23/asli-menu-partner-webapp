import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { getSelectableList } from "../../common/utils";

const CustomSelect = ({
  label,
  name,
  list,
  value,
  validationError,
  isCreatable,
  isMulti,
  onChange,
  isRequired,
}: {
  name: string;
  list: string[] | { value: string; label: string }[];
  label: string;
  value:
    | { value: string; label: string }
    | { value: string; label: string }[]
    | null;
  onChange: (value: string | string[]) => void;
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

  const options = isCreatable
    ? getSelectableList(Array.from(new Set(list as string[])))
    : list;

  const SelectComponent = isCreatable ? CreatableSelect : Select;

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label} {isRequired ? "*" : ""}
        </label>
      )}
      <SelectComponent
        name={name}
        isMulti={isMulti}
        options={options}
        value={localState}
        onChange={onSelectChange}
        isSearchable={isCreatable}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: "30px",
            marginBottom: validationError ? "" : "10px",
          }),
        }}
      />
      {validationError ? (
        <div style={{ marginBottom: "10px", color: "red", fontSize: 12 }}>
          {validationError}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomSelect;
