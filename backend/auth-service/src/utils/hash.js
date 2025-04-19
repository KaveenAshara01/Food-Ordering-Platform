import { genSalt, hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}