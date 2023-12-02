export const performCustomValidations = (
  formData: object,
  fields: string[]
) => {
  const errors: any = {};
  let isValid = true;
  fields.forEach((field) => {
    if (!formData[field as keyof typeof formData]) {
      isValid = false;
      errors[field] = "Required";
    }
  });
  return {
    isValid,
    errors,
  };
};
