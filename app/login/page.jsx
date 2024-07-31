import Divider from "../Components/ui/Divider";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-end p-8">
          <h1>Login</h1>
        </div>
        <div className="flex flex-col items-center p-8">
          <div className="card w-1/2 bg-base-100 border-2 shadow-md shadow-info/60 flex flex-col justify-center items-center p-8">
            <div className="card-body items-center">
              <h1 className="card-title text-2xl font-bold">
                Create an account
              </h1>
              <h3 className="text-sm font-extralight">
                Enter your email below to create your account
              </h3>
              <input
                className="input input-bordered w-full max-w-xs mt-4"
                type="text"
              />
              <button className="btn btn-info w-full">
                Sign in with Email
              </button>
              <Divider>OR CONTINUE WITH</Divider>
              <button className="btn w-full bg-gray-900 text-gray-50 hover:text-gray-900">
                <FaGithub size={20} />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
