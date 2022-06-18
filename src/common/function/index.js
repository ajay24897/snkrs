export const capitalizeFirstLetter = (str = "") => {
  return `${str[0]?.toUpperCase()}${str?.slice(1).toLowerCase()}` ?? "";
};

export const removeRrandNameFromTitle = (title = "", brandName = "") => {
  return title.toLocaleLowerCase()?.replace(brandName.toLowerCase(), "").trim();
};
