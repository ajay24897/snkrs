import {
  ERROR,
  LOADING,
  SHOE_TYPE,
  SUCCESS,
} from "../constant/string/common.string";

export const capitalizeFirstLetter = (str = "") => {
  return `${str[0]?.toUpperCase()}${str?.slice(1).toLowerCase()}` ?? "";
};

export const removeRrandNameFromTitle = (title = "", brandName = "") => {
  return title.toLocaleLowerCase()?.replace(brandName.toLowerCase(), "").trim();
};

export const firebaseData = (res) => {
  let arr = [];
  res?.docs?.map((doc) => arr.push({ ...doc.data(), id: doc.id }));
  return arr;
};

export const isLoading = (status) => {
  return status?.toLocaleLowerCase() === LOADING;
};

export const isSuccess = (status) => {
  return status?.toLocaleLowerCase() === SUCCESS;
};

export const isError = (status) => {
  return status?.toLocaleLowerCase() === ERROR;
};

export const getShoeGenderTitle = (title) => {
  if (title === "men") return SHOE_TYPE.MEN;
  if (title === "women") return SHOE_TYPE.WOMEN;
  return SHOE_TYPE.UNISEX;
};

export const ammountInDecimal = (value) => {
  if (!value) return 0.0;
  return parseFloat(value).toFixed(2);
};
