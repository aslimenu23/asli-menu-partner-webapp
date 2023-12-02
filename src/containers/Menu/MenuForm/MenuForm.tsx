import React, { useState } from "react";
import TextInput from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";
import { CATEGORY_LIST, DISH_TYPES_LIST } from "./MenuForm.constants";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Button/Button";
import { FormFooter, MenuFormWrapper } from "./MenuForm.styles";

const MenuForm = ({
  item,
  onChange,
  onCancel,
}: {
  item?: any;
  onChange: (item: any) => void;
  onCancel: () => void;
}) => {
  const [category, setCategory] = useState(item?.category);
  const [name, setName] = useState(item?.name);
  const [dishType, setDishType] = useState(item?.dishType);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    onChange(Object.fromEntries(formData.entries()));
  };

  return (
    <MenuFormWrapper>
      <form onSubmit={onSubmit}>
        <Select
          isRequired
          list={CATEGORY_LIST}
          name="category"
          label="Category"
          value={category}
          onChange={(value: any) => setCategory(value)}
        />
        <Select
          isRequired
          list={CATEGORY_LIST}
          name="name"
          label="Item Name"
          value={name}
          onChange={(value: any) => setName(value)}
        />
        <TextInput
          name="description"
          label="Item Description"
          defaultValue={item?.description}
        />
        <TextInput
          isRequired
          name="price"
          label="Price"
          defaultValue={item?.price}
        />
        <Select
          isRequired
          list={DISH_TYPES_LIST}
          name="dishType"
          label="Type"
          value={dishType}
          onChange={(value: any) => setDishType(value)}
        />
        <Checkbox
          name="isBestSeller"
          label="Is Best Seller?"
          defaultValue={item?.isBestSeller}
        />
        <FormFooter>
          <Button onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </FormFooter>
      </form>
    </MenuFormWrapper>
  );
};

export default MenuForm;
