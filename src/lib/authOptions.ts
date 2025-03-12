import { FcGoogle } from "react-icons/fc";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
const authOptions: NextAuthConfig = {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        });
        //TODO: add password check

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, user,account }) {
      console.log("user:",user);
      console.log("account:",account);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  adapter: PrismaAdapter(prisma),
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
