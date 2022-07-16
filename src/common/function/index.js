import { LOADING } from "../constant/string/common.string";

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
  return status.toLocaleLowerCase() === LOADING;
};
