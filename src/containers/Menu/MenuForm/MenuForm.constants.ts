import { CATEGORY, DISH_TYPES } from "./MenuForm.types";

export const DISH_TYPES_LIST = [
  {
    label: DISH_TYPES.VEG.split("_").join(" ").toLocaleUpperCase(),
    value: DISH_TYPES.VEG,
  },
  {
    label: DISH_TYPES.VEG_EGG.split("_").join(" ").toLocaleUpperCase(),
    value: DISH_TYPES.VEG_EGG,
  },
  {
    label: DISH_TYPES.NON_VEG.split("_").join(" ").toLocaleUpperCase(),
    value: DISH_TYPES.NON_VEG,
  },
];

export const CATEGORY_LIST = [
  { label: CATEGORY.SNACKS.toLocaleUpperCase(), value: CATEGORY.SNACKS },
  { label: CATEGORY.CHINESE.toLocaleUpperCase(), value: CATEGORY.CHINESE },
  {
    label: CATEGORY.NORTH_INDIAN.toLocaleUpperCase(),
    value: CATEGORY.NORTH_INDIAN,
  },
  {
    label: CATEGORY.NORTH_INDIAN.toLocaleUpperCase(),
    value: CATEGORY.NORTH_INDIAN,
  },
  {
    label: CATEGORY.SOUTH_INDIAN.toLocaleUpperCase(),
    value: CATEGORY.SOUTH_INDIAN,
  },
  {
    label: CATEGORY.HOT_BEVERAGES.toLocaleUpperCase(),
    value: CATEGORY.HOT_BEVERAGES,
  },
  {
    label: CATEGORY.COLD_BEVERAGES.toLocaleUpperCase(),
    value: CATEGORY.COLD_BEVERAGES,
  },
];
