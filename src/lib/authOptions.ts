import NextAuth, { Account,  NextAuthConfig, User } from "next-auth";
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
        console.log("SignIN payload: ",payload);
        const { data } = await axios.post(LOGIN_URL, payload);
        
        user.id = data?.user?.id.toString();
        user.token = data?.user?.token;
        user.provider = data?.user?.provider;
        user.color = data?.user?.color;
        // console.log("Sign In User: ",user);
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
      // console.log("JWT TOKEN : ",token);
      // console.log("JWT USER :",user );
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
        session.backendToken = token.backendToken;
      }
      // console.log("Session:", session);
      // console.log("Session_token : ",token);
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
