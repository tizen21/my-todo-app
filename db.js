import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function initializeDb() {
  const db = await open({
    filename: "./my-todo-app.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      task TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0,
      priority TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  console.log("Database initialized");
}

initializeDb().catch((error) => {
  console.error("Failed to initialize database:", error);
});

export async function openDB() {
  return open({
    filename: "./my-todo-app.db",
    driver: sqlite3.Database,
  });
}
