import { openDB } from "../../../db";
import { verifyToken } from "../../../auth";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    const user = await verifyToken(token); // Fonction pour vérifier et récupérer l'utilisateur à partir du token

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const db = await openDB();
    const todos = await db.all("SELECT * FROM todos WHERE userId = ?", [
      user.id,
    ]);

    return new Response(JSON.stringify({ todos }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET /api/todos:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
