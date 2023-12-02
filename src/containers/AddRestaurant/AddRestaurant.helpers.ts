export const performCustomValidations = (data: object, fields: string[]) => {
  const errors: any = {};
  let isValid = true;
  fields.forEach((field) => {
    if (!data[field as keyof typeof data]) {
      isValid = false;
      errors[field] = "Required";
    } else if (
      Array.isArray(data[field as keyof typeof data]) &&
      (data[field as keyof typeof data] as any[]).length === 0
    ) {
      isValid = false;
      errors[field] = "Required";
    }
  });
  return {
    isValid,
    errors,
  };
};
