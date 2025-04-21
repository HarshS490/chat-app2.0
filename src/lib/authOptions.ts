import NextAuth, { Account,  NextAuthConfig, User } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"
import { LOGIN_URL } from "./apiEndPoints";
import axios from "axios";

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
  provider?: string | null;
};

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
    GitHub,
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User
      account: Account | null;
    }) {
      /**
       * This method willl be called only once i.e during SigIn
       * Returns a truthy value telling whether user is authorized or not.
       */
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
        user.color = data?.user?.color;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      /**
       *
       * user is avaialable only during signIn.
       */
      if (user) {
        token.userId = user.id;
        token.backendToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
        session.backendToken = token.backendToken;
      }
      return session;
    },
    authorized: async ({ auth}) => {
      return !!auth;
    }
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
