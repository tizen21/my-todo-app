import jwt from "jsonwebtoken";
import { openDB } from "./db";

const SECRET_KEY = process.env.SECRET_KEY;

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = await openDB();
    const user = await db.get("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
