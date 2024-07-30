import { prisma } from "./prisma";
import Github from "next-auth/providers/github";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github],
});
