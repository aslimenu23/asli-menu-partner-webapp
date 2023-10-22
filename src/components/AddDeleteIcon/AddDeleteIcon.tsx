import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const AddDeleteIcon = ({
  listMaxOut,
  list,
  index,
  addCb,
  deleteCb,
}: {
  listMaxOut: number;
  index: number;
  list: any[];
  addCb: () => void;
  deleteCb: (index: number) => void;
}) => {
  if (index === list.length - 1 && list.length === listMaxOut) return <></>;

  if (index === list.length - 1) {
    return <AiFillPlusCircle size={24} onClick={addCb} />;
  }

  return <AiFillMinusCircle size={24} onClick={() => deleteCb(index)} />;
};

export default AddDeleteIcon;
