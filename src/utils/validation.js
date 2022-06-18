export const validateFullName = (v) => {
  return !!v && v.length >= 3;
};

export const validateEmail = (v) => {
  if (!v) return false;

  const emailReg = /^\w+@[a-zA-Z0-9]{2,15}(?:\.[a-z]{2,4}){1,3}$/;
  return emailReg.test(v);
};

export const validateConfirmEmail = (v, targetV) => {
  return !!v && v === targetV && validateEmail(v);
};