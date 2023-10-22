import React from "react";
import { ImageInputWrapper } from "./ImageInput.styles";

const ImageInput = ({
  isRequired,
  label,
  name,
  onChange,
  noMargin,
}: {
  name: string;
  label?: string;
  isRequired?: boolean;
  noMargin?: boolean;
  onChange: (file: any) => void;
}) => {
  const onFileSelect = (event: any) => {
    onChange(event.target.files[0]);
  };

  return (
    <ImageInputWrapper noMargin={noMargin}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        required={isRequired}
        type="file"
        name={name}
        onChange={onFileSelect}
      />
    </ImageInputWrapper>
  );
};

export default ImageInput;
