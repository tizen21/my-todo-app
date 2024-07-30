import { auth } from "../src/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}
