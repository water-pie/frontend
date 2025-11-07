export const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  value = value.replace(/[^0-9]/g, "");

  let result = "";
  if (value.length < 4) {
    return value;
  } else if (value.length < 7) {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3);
  } else if (value.length < 11) {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3, 7);
    result += "-";
    result += value.slice(7);
  } else {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3, 7);
    result += "-";
    result += value.slice(7, 11);
  }

  return result;
};
