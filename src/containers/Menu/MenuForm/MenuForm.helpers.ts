export const getPayload = (states: any) => {
  const { isBestSeller, description, category, name, dishType, price } = states;

  const requiredStringFields = [price];
  const isAnyRequiredStringFieldEmpty = requiredStringFields.some(
    (field) => !field.value || field.error
  );

  const requiredSelectFields = [name, dishType, category];
  const isAnyRequiredSelectFieldEmpty = requiredSelectFields.some((field) => {
    if (!field) return true;
    if (Array.isArray(field)) {
      return field.length === 0;
    }
    return false;
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
      name,
      category,
      dishType,
      isBestSeller,
      price: price.value,
      description: description.value,
    },
  };
};
