import React, { useState } from "react";
import TextInput from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Button/Button";
import { FormFooter, MenuFormWrapper } from "./MenuForm.styles";
import { useCommonStates } from "../../../store/commonStore";
import { CATEGORY, DISH_TYPES } from "./MenuForm.types";

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

  const resChoices = useCommonStates().resChoices;

  const [categoryList, setCategoryList] = useState<any[]>([
    ...Object.values(CATEGORY),
    ...(resChoices?.dishCategories || []),
  ]);
  const [dishNames, setDishNames] = useState<any[]>(
    resChoices?.dishNames || []
  );

  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    const menuItem = {
      ...formDataObject,
      category,
      name,
      dishType,
    };

    onChange(menuItem);
  };

  const onCategoryChange = (value: any) => {
    setCategory(value);
    if (value.__isNew__) {
      setCategoryList([...categoryList, ...value.value]);
    }
  };

  const onNameChange = (value: any) => {
    setName(value);
    if (value.__isNew__) {
      setDishNames([...dishNames, ...value.value]);
    }
  };

  return (
    <MenuFormWrapper>
      <form onSubmit={onSubmit}>
        <Select
          isCreatable
          isRequired
          list={categoryList}
          name="category"
          label="Category"
          value={category}
          onChange={onCategoryChange}
        />
        <Select
          isCreatable
          isRequired
          list={dishNames}
          name="name"
          label="Item Name"
          value={name}
          onChange={onNameChange}
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
          list={Object.values(DISH_TYPES)}
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
