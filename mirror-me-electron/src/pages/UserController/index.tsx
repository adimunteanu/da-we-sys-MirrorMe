export const isEmail = (str: string): boolean => {
  return /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(str);
};

export const isPassword = (str: string): boolean => {
  return /^.{4,}/.test(str);
};

export default '';
