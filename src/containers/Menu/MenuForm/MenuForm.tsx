import React, { useState } from "react";
import TextInput from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Button/Button";
import { FormFooter, MenuFormWrapper } from "./MenuForm.styles";
import { useCommonActions, useCommonStates } from "../../../store/commonStore";
import { DISH_TYPES } from "./MenuForm.types";
import { getPayload } from "./MenuForm.helpers";

const MenuForm = ({
  item,
  onChange,
  onCancel,
}: {
  item?: any;
  onChange: (item: any) => void;
  onCancel: () => void;
}) => {
  const { setSnackbarMessage, setCategoryList, setDishNameList } =
    useCommonActions();
  const resChoices = useCommonStates().resChoices;

  const dishCategories = resChoices?.dishCategories || [];
  const dishNames = resChoices?.dishNames || [];

  const [category, setCategory] = useState(item?.category);
  const [name, setName] = useState(item?.name);
  const [dishType, setDishType] = useState(item?.dishType);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(
    !!item?.isBestSeller
  );
  const [description, setDescription] = useState({
    value: item?.description,
    error: "",
  });
  const [price, setPrice] = useState({ value: item?.price, error: "" });

  const onSubmit = (event: any) => {
    event.preventDefault();
    const menuItem = {
      isBestSeller,
      description,
      category,
      name,
      dishType,
      price,
    };

    const { error, payload } = getPayload(menuItem);
    if (error) {
      setSnackbarMessage(error);
      return;
    }

    onChange(payload);
  };

  const onCategoryChange = (value: any) => {
    setCategory(value.value);
    if (value.__isNew__) {
      setCategoryList([...dishCategories, value.value]);
    }
  };

  const onNameChange = (value: any) => {
    setName(value.value);
    if (value.__isNew__) {
      setDishNameList([...dishNames, value.value]);
    }
  };

  return (
    <MenuFormWrapper>
      <form onSubmit={onSubmit} noValidate>
        <Select
          isCreatable
          isRequired
          list={dishCategories}
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
          value={description.value}
          error={description.error}
          onChange={(value: any, error: string) =>
            setDescription({ value, error })
          }
        />
        <TextInput
          isRequired
          name="price"
          label="Price"
          value={price.value}
          error={price.error}
          onChange={(value, error) => setPrice({ value, error })}
        />
        <Select
          isRequired
          list={Object.values(DISH_TYPES)}
          name="dishType"
          label="Type"
          value={dishType}
          onChange={(value: any) => setDishType(value.value)}
        />
        <Checkbox
          name="isBestSeller"
          label="Is Best Seller?"
          value={isBestSeller}
          onChange={(value) => setIsBestSeller(value)}
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
