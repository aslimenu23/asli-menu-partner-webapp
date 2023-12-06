import React, { useEffect, useState } from "react";
import { TimingsWrapper } from "../AddRestaurant.styles";
import TimePicker from "../../../components/TimePicker/TimePicker";
import moment from "moment";
import AddDeleteIcon from "../../../components/AddDeleteIcon/AddDeleteIcon";
import { MAX_RESTAURANT_TIMINGS_COUNT } from "../../../common/constants";
import { v4 as uuid } from "uuid";

const Timings = ({ time, onChange, name, title, shouldShow }: any) => {
  const [keyUUID, setKeyUUID] = useState("");

  useEffect(() => {
    setKeyUUID(uuid());
  }, [time]);

  const addTime = () => {
    onChange([
      ...time,
      {
        startTime: moment(),
        endTime: moment(),
      },
    ]);
  };

  const removeTime = (index: number) => {
    time.splice(index, 1);
    setKeyUUID(uuid());
    onChange([...time]);
  };

  const onTimeChange = (value: any, index: number, key: string) => {
    time[index][key] = value;
    setKeyUUID(uuid());
    onChange([...time]);
  };

  const currentTimings = time.map((t: any, index: number) => {
    return (
      <TimingsWrapper key={keyUUID + " " + index}>
        <label>{title}</label>
        <div>
          <TimePicker
            label="Start Time"
            name={`${name}_from_${index + 1}`}
            value={moment(t?.startTime, "HH:mm")}
            onChange={(value) =>
              onTimeChange(value.format("HH:mm"), index, "startTime")
            }
          />
          <TimePicker
            label="End Time"
            name={`${name}_to_${index + 1}`}
            value={moment(t?.endTime, "HH:mm")}
            onChange={(value) => onTimeChange(value, index, "endTime")}
          />
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
