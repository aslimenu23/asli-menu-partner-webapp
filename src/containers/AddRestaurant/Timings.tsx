import React, { useEffect, useState } from "react";
import { TimingsWrapper } from "./AddRestaurant.styles";
import TimePicker from "../../components/TimePicker/TimePicker";
import moment from "moment";
import AddDeleteIcon from "../../components/AddDeleteIcon/AddDeleteIcon";
import { MAX_RESTAURANT_TIMINGS_COUNT } from "../../common/constants";
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
        startTime: moment(),
        endTime: moment(),
      },
    ]);
  };

  const removeTime = (index: number) => {
    time.splice(index, 1);
    onChange([...time]);
  };

  const onTimeChange = (value: any, index: number, key: string) => {
    time[index][key] = moment(value).format("HH:mm");
    onChange(time);
  };

  const currentTimings = time.map((time: any, index: number) => {
    return (
      <TimingsWrapper key={keyUUID + " " + index}>
        <label>{title}</label>
        <div>
          <TimePicker
            label="Start Time"
            name={`${name}_from_${index + 1}`}
            value={moment(time[index]?.startTime, "HH:mm")}
            onChange={(value) => onTimeChange(value, index, "startTime")}
          />
          <TimePicker
            label="End Time"
            name={`${name}_to_${index + 1}`}
            value={moment(time[index]?.endTime, "HH:mm")}
            onChange={(value) => onTimeChange(value, index, "endTime")}
          />
          <AddDeleteIcon
            index={index}
            list={time}
            listMaxOut={MAX_RESTAURANT_TIMINGS_COUNT}
            addCb={addTime}
            deleteCb={removeTime}
          />
        </div>
      </TimingsWrapper>
    );
  });

  return shouldShow && time ? currentTimings : <></>;
};

export default Timings;
