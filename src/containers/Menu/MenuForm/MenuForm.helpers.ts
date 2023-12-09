export const getPayload = (states: any) => {
  const { isBestSeller, description, category, name, dishType, price } = states;

  const requiredStringFields = [price];
  const isAnyRequiredStringFieldEmpty = requiredStringFields.some(
    (field) => !field.value || field.error
  );

  const requiredSelectFields = [name, dishType, category];
  const isAnyRequiredSelectFieldEmpty = requiredSelectFields.some((field) => {
    return !field?.value;
  });

  if (isAnyRequiredStringFieldEmpty || isAnyRequiredSelectFieldEmpty) {
    return {
      error: "Please fill all the required fields",
      payload: {},
    };
  }

  return {
    error: "",
    payload: {
      isBestSeller,
      name: name.value,
      category: category.value,
      dishType: dishType.value,
      price: price.value,
      description: description.value,
    },
  };
};
