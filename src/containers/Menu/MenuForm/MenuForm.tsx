import React from "react";
import TextInput from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";
import { CATEGORY_LIST, DISH_TYPES_LIST } from "./MenuForm.constants";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Button/Button";
import { MenuFormWrapper } from "./MenuForm.styles";

const MenuForm = ({
  item,
  onChange,
}: {
  item?: any;
  onChange: (item: any) => void;
}) => {
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
          defaultValue={item?.category}
        />
        <TextInput
          isRequired
          name="name"
          label="Item Name"
          defaultValue={item?.name}
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
          defaultValue={item?.dishType}
        />
        <Checkbox
          name="isBestSeller"
          label="Is Best Seller?"
          defaultValue={item?.isBestSeller}
        />

        <Button type="submit">Submit</Button>
      </form>
    </MenuFormWrapper>
  );
};

export default MenuForm;