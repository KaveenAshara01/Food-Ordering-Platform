import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

export function generateToken(payload) {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h" 
  });
}