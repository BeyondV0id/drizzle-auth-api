import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;

export const random = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = async (
  input: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(input, hash);
};

//sessons
export const generateSessionToken = (): string => {
  return uuidv4();
};

export const getSessionExpiry = (): Date => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  return expiresAt;
};
