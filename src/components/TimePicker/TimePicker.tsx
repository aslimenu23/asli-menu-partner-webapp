import React from "react";
import RCTimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { TimePickerContainer } from "./TimePicker.styles";

const TimePicker = (
  props: RCTimePicker["props"] & {
    label: string;
  }
) => {
  return (
    <TimePickerContainer>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <RCTimePicker
        {...props}
        className="rcTimePicker"
        popupClassName="rcTimePickerPopup"
        placement="bottomRight"
        showSecond={false}
        clearIcon={null}
      />
    </TimePickerContainer>
  );
};

export default TimePicker;
