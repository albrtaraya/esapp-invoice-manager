import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env", quiet: true });

const SECRET_KEY = process.env.JWT_SECRET || "clave-super-secreta";

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
