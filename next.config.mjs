import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
