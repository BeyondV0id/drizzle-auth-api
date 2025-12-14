import validator from 'validator';

export const isValidEmail = (email:string):boolean => {
  return validator.isEmail(email);
};

export const isValidUsername = (username:string):boolean=>{
  if(username.length<3 || username.length>32)return false;
  return /^[A-Za-z0-9]+$/.test(username);
};

export const isValidPassword = (password:string):boolean =>{
  return password.length >= 6;
};
