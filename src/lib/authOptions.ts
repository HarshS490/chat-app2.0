import NextAuth, { Account, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { LOGIN_URL } from "./apiEndPoints";
import axios from "axios";

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
  provider?: string | null;
}

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
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          email: user.email,
          name: user.name,
          oauth_id: account?.providerAccountId,
          image: user?.image,
          provider: account?.provider,
        };
        const { data } = await axios.post(LOGIN_URL, payload);
        user.id = data?.user?.id.toString();
        user.token = data?.user?.token;
        user.provider = data?.user?.provider;

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
      console.log("session_token", token);
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      console.log("sessin:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      console.log("token: ", token);
      return token;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
