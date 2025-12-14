import { Request, Response, NextFunction } from 'express';
import { FieldError, RegisterPayload } from '../types/auth';
import { isValidEmail, isValidPassword, isValidUsername } from '../helpers/rules';

export const validateRegister = (
  req: Request<{}, {}, RegisterPayload>,
  res: Response,
  next: NextFunction
) => {
  const errors: FieldError[] = [];
  const { email, username, password } = req.body;
  if (!email) errors.push({ field: 'email', message: 'Email is required' });
  if (!username)
    errors.push({ field: 'username', message: 'Username is required' });
  if (!password)
    errors.push({ field: 'password', message: 'Password is required' });

  const trimMail = email.trim().toLowerCase();
  const trimUserName = username.trim();
  if(!isValidEmail(trimMail))errors.push({field:"email", message:"Email must be valid"});
  if(!isValidUsername(trimUserName))errors.push({field:"username", message:"Username must be valid"});
  if(!isValidPassword(password))errors.push({field:"password", message:"Password be valid"});
  if(errors.length)return res.status(400).json({errors});

  res.locals.payload = {
    email : trimMail,
    username : trimUserName,
    password : password,
  }
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const { email, password } = req.body;

  if (!email) errors.push({ field: "email", message: "Email is required" });
  if (!password) errors.push({ field: "password", message: "Password is required" });
  if (errors.length) return res.status(400).json({ errors });

  const cleanEmail = (email as string).trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) errors.push({ field: "email", message: "Email must be valid" });

  if (errors.length) return res.status(400).json({ errors });

  res.locals.payload = { email: cleanEmail, password };
  next();
};

export const validateUpdateProfile = (req:Request, res:Response, next:NextFunction) => {
  const errors: FieldError[] = [];
  const {username, email, password } = req.body;

  if (email && !isValidEmail(email.trim().toLowerCase())) errors.push({ field: "email", message: "Email is invalid" });
  if (password && !isValidPassword(password)) errors.push({ field: "password", message: "Password is invalid, must be atleast 6 characters" });
  if (username && !isValidUsername(username.trim())) errors.push({ field: "username", message: "Username is invalid" });
  if (errors.length) return res.status(400).json({ errors });

  res.locals.payload = {
    email : email? email.trim().toLowerCase() : undefined,
    username : username? username.trim() : undefined,
    password : password ||  undefined,
  };
  next();
};
