import { LOCAL_STORAGE_KEY_REFIX } from "./constants";

export const setItemInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key: string, fallback: any) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) || "");
  }
  return fallback;
};

export const removeItemInLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const removeItemInLocalStorageWithAsliMenuPrefix = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(LOCAL_STORAGE_KEY_REFIX)) {
      localStorage.removeItem(key);
    }
  });
};

export const convertToCapitalCase = (anyString: string) => {
  anyString = anyString.toLowerCase();
  const words = anyString.split(" ");
  const capitalCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalCaseName = capitalCaseWords.join(" ");
  return capitalCaseName;
};

export const getSelectableList: any = (values: string[]) => {
  if (!values) return [];
  return values.map((value) => ({
    label: value ? convertToCapitalCase(value) : "",
    value: value ? convertToCapitalCase(value) : "",
  }));
};