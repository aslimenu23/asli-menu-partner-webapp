import React from "react";
import { PhoneNumbersWrapper } from "./AddRestaurant.styles";
import ImageInput from "../../components/ImageInput/ImageInput";
import { MAX_RESTAURANT_PHOTO_COUNT } from "../../common/constants";
import AddDeleteIcon from "../../components/AddDeleteIcon/AddDeleteIcon";

const PhotoUploadInputs = ({ images, onChange }: any) => {
  const addImage = () => {
    onChange([...images, {}]);
  };

  const removeImage = (index: number) => {
    images.splice(index, 1);
    onChange([...images]);
  };

  const onImageUpload = (file: any, index: number) => {
    onChange((prevImages: any) => {
      prevImages[index] = file;
      return [...prevImages];
    });
  };

  const currentImages = images.map((image: any, index: number) => {
    return (
      <PhoneNumbersWrapper key={index}>
        <ImageInput
          noMargin
          isRequired={index < MAX_RESTAURANT_PHOTO_COUNT / 2}
          name={`image_${index + 1}`}
          label={`Upload restaurant photo ${index + 1}`}
          onChange={(file) => onImageUpload(file, index)}
        />
        <AddDeleteIcon
          index={index}
          list={images}
          listMaxOut={MAX_RESTAURANT_PHOTO_COUNT}
          addCb={addImage}
          deleteCb={removeImage}
        />
      </PhoneNumbersWrapper>
    );
  });

  return currentImages;
};

export default PhotoUploadInputs;
