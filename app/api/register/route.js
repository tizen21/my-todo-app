import { openDB } from "../../../db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const db = await openDB();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await db.get(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insère l'utilisateur dans la base de données
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in POST /api/register:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
