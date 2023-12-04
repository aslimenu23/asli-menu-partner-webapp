import React, { useEffect, useState } from "react";
import { PhoneNumbersWrapper } from "../AddRestaurant.styles";
import TextInput from "../../../components/TextInput/TextInput";
import { MAX_RESTAURANT_PHONE_COUNT } from "../../../common/constants";
import AddDeleteIcon from "../../../components/AddDeleteIcon/AddDeleteIcon";
import { InputTypes } from "../../../components/TextInput/TextInput.types";
import { v4 as uuid } from "uuid";

const PhoneNumbers = ({ phoneNumbers, onChange }: any) => {
  const [keyUUID, setKeyUUID] = useState("");

  useEffect(() => {
    setKeyUUID(uuid());
  }, []);

  const addPhoneNumber = () => {
    onChange([...phoneNumbers, ""]);
  };

  const removePhoneNumber = (index: number) => {
    phoneNumbers.splice(index, 1);
    setKeyUUID(uuid()); // Deliberately re-rendering the inputs
    onChange([...phoneNumbers]);
  };

  const onPhoneNumberChange = (value: string, index: number) => {
    phoneNumbers[index] = value;

    onChange([...phoneNumbers]);
  };

  const currentPhoneNumbers = phoneNumbers.map(
    (phoneNumber: any, index: number) => {
      return (
        <PhoneNumbersWrapper key={keyUUID + " " + index}>
          <TextInput
            noMargin
            isRequired={index < MAX_RESTAURANT_PHONE_COUNT / 2}
            label={`Phone Number ${index + 1}`}
            name={`phone_${index + 1}`}
            defaultValue={phoneNumber}
            inputType={InputTypes.MOBILE}
            onChange={(value) => onPhoneNumberChange(value, index)}
          />
          <AddDeleteIcon
            index={index}
            list={phoneNumbers}
            listMaxOut={MAX_RESTAURANT_PHONE_COUNT}
            addCb={addPhoneNumber}
            deleteCb={removePhoneNumber}
          />
        </PhoneNumbersWrapper>
      );
    }
  );

  return currentPhoneNumbers;
};

export default PhoneNumbers;
