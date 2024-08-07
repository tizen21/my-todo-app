"use client";

import Divider from "../Components/ui/Divider";
/* import { FaGithub } from "react-icons/fa"; */
import { useState } from "react";
import { useDarkMode } from "../DarkModeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
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
      console.error("Error during registration:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col">
        <div className="flex flex-col items-center p-8">
          <div className="card w-1/2 bg-base-100 border-2 shadow-md shadow-info/60 flex flex-col justify-center items-center p-8">
            <div className="card-body items-center">
              <form onSubmit={handleRegister}>
                <div className="flex flex-col items-center gap-4">
                  <h1 className="card-title text-2xl font-bold">Register</h1>
                  <h3 className="text-sm font-extralight">
                    Enter your username and password to register
                  </h3>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full max-w-xs mb-2 placeholder:text-center"
                    placeholder="Username"
                  />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full max-w-xs mb-2 placeholder:text-center"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-info w-full mt-2">
                  Register
                </button>
                <Divider>OR CONTINUE WITH</Divider>
                <Link
                  className="btn w-full bg-gray-900 text-gray-50 hover:text-gray-900"
                  href="/login"
                >
                  {/* <FaGithub size={20} /> */}
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
