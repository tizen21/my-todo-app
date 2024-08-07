"use client";

import Divider from "../Components/ui/Divider";
/* import { FaGithub } from "react-icons/fa"; */
import { useState } from "react";
import { useDarkMode } from "../DarkModeContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Vérifie si la réponse n'est pas OK
      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || "Something went wrong");
        return;
      }

      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      setMessage(data.message);
      router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col">
        {/* <div className="flex flex-col justify-center items-center p-8">
          <h1 className="font-bold text-2xl">Login</h1>
        </div> */}
        <div className="flex flex-col items-center p-8">
          <div className="card w-1/2 bg-base-100 border-2 shadow-md shadow-info/60 flex flex-col justify-center items-center p-8">
            <div className="card-body items-center">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col items-center gap-4">
                  <h1 className="card-title text-2xl font-bold">Login</h1>
                  <h3 className="text-sm font-extralight">
                    Enter your username and password to login
                  </h3>
                  <input
                    className="input input-bordered w-full max-w-xs mb-2 placeholder:text-center"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="input input-bordered w-full max-w-xs mb-2 placeholder:text-center"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-info w-full mt-2">Sign in</button>
                <Divider>OR CONTINUE WITH</Divider>
                <Link
                  className="btn w-full bg-gray-900 text-gray-50 hover:text-gray-900"
                  href="/register"
                >
                  {/* <FaGithub size={20} /> */}
                  Create an account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
