import React from "react";
import { TimePickerContainer } from "./TimePicker.styles";

const TimePicker = (props: {
  value: string | null;
  onChange: (newValue: string) => void;
  name: string;
  label: string;
}) => {
  const { value, label, name, onChange } = props;

  const hours = value?.split(":")[0];
  const minutes = value?.split(":")[1];

  const handleHourChange = (e: any) => {
    const newHours = e.target.value;
    onChange(`${newHours}:${minutes}`);
  };

  const handleMinuteChange = (e: any) => {
    const newMinutes = e.target.value;
    onChange(`${hours}:${newMinutes}`);
  };

  const renderHourSelect = () => {
    return (
      <select value={hours} onChange={handleHourChange}>
        {[...Array.from({ length: 24 }, (_, index) => index + 1)].map(
          (hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          )
        )}
      </select>
    );
  };

  const renderMinuteSelect = () => {
    return (
      <select value={minutes} onChange={handleMinuteChange}>
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
    );
  };

  return (
    <TimePickerContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="timings">
        {renderHourSelect()}
        {renderMinuteSelect()}
      </div>
    </TimePickerContainer>
  );
};

export default TimePicker;
