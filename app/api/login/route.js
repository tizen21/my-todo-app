import { openDB } from "../../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req) {
  const { username, password } = await req.json();
  const db = await openDB();

  // Récupère l'utilisateur de la base de données
  const user = await db.get("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (user) {
    // Compare le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Génère un token d'authentification
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      // Authentification réussie
      return new Response(
        JSON.stringify({ message: "Login successful", token }),
        {
          status: 200,
        }
      );
    } else {
      // Mot de passe incorrect
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }
  } else {
    // Utilisateur non trouvé
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
}
