import React, { useEffect, useState } from "react";
import { TimingsWrapper } from "../AddRestaurant.styles";
import TimePicker from "../../../components/TimePicker/TimePicker";
import AddDeleteIcon from "../../../components/AddDeleteIcon/AddDeleteIcon";
import { MAX_RESTAURANT_TIMINGS_COUNT } from "../../../common/constants";
import { v4 as uuid } from "uuid";

const Timings = ({ time, onChange, name, title, shouldShow }: any) => {
  const [keyUUID, setKeyUUID] = useState("");

  useEffect(() => {
    setKeyUUID(uuid());
  }, []);

  const addTime = () => {
    onChange([
      ...time,
      {
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const removeTime = (index: number) => {
    time.splice(index, 1);
    setKeyUUID(uuid());
    onChange([...time]);
  };

  const onTimeChange = (value: any, index: number, key: string) => {
    if (!time[index]) {
      time[index] = {};
    }
    time[index][key] = value;
    onChange([...time]);
  };

  const currentTimings = time.map((t: any, index: number) => {
    return (
      <TimingsWrapper key={keyUUID + " " + index}>
        <label>{title}</label>
        <div className="timingsDiv">
          <div className="timingInputs">
            <TimePicker
              label=""
              name={`${name}_from_${index + 1}`}
              value={t?.startTime ? t?.startTime : null}
              onChange={(value) => {
                onTimeChange(value, index, "startTime");
              }}
            />
            -- To --
            <TimePicker
              label=""
              name={`${name}_to_${index + 1}`}
              value={t?.endTime ? t?.endTime : null}
              onChange={(value) => onTimeChange(value, index, "endTime")}
            />
          </div>
          <AddDeleteIcon
            index={index}
            list={time}
            addCb={addTime}
            deleteCb={removeTime}
            listMaxOut={MAX_RESTAURANT_TIMINGS_COUNT}
          />
        </div>
      </TimingsWrapper>
    );
  });

  return shouldShow && time ? currentTimings : <></>;
};

export default Timings;
