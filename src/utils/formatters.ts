export const formatPhoneNumber = (value: string): string => {
  if (!value) return "";

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}${numbers.slice(11)}`;
};

export const formatBusinessNumber = (value: string): string => {
  if (!value) return "";

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 13)}${numbers.slice(13)}`;
};