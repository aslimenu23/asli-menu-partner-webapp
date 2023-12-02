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
  list: string[];
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isRequired?: boolean;
  isCreatable?: boolean;
  isMulti?: boolean;
  validationError?: string;
}) => {
  const [localState, setLocalState] = useState(
    getSelectableList(isMulti ? value : [value])
  );

  const onSelectChange = (selectValues: any | any[]) => {
    if (isMulti) {
      setLocalState(
        getSelectableList(selectValues.map((item: any) => item.value))
      );
      onChange(selectValues.map((item: any) => item.value));
    } else {
      setLocalState(getSelectableList([selectValues.value]));
      onChange(selectValues.value);
    }
  };

  const options = getSelectableList(list);

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
        value={localState}
        options={options}
        onChange={onSelectChange}
        isMulti={isMulti}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            height: "30px",
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
