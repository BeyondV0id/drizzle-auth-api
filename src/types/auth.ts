export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};
export type LoginPayload = { email: string; password: string };
export type FieldError = {
  field: 'email' | 'username' | 'password';
  message: string;
};
