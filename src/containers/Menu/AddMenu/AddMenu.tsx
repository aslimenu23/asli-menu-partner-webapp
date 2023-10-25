import React from "react";
import TextInput from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";
import { CATEGORY_LIST, DISH_TYPES_LIST } from "./AddMenu.constants";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Button/Button";

const AddMenu = ({ onAddItem }: { onAddItem: (item: any) => void }) => {
  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    onAddItem(Object.fromEntries(formData.entries()));
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        isRequired
        list={CATEGORY_LIST}
        name="category"
        label="Category"
      />
      <TextInput isRequired name="name" label="Item Name" />
      <TextInput isRequired name="price" label="Price" />
      <Select isRequired list={DISH_TYPES_LIST} name="dishType" label="Type" />
      <Checkbox name="isBestSeller" label="Is Best Seller?" />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddMenu;
