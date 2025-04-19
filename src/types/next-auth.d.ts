import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth"{
  interface Session{
    user:{
      id:string;
    }& DefaultSession["user"]
    backendToken:string;
  }
  interface User {
    id:string;
    name:string;
    email:string;
    image:string;
    token:string;
    provider:string;
    color:string|null;
  }
};

declare module "next-auth/jwt"{
  interface JWT{
    userId:string|undefined;
    backendToken:string;
  }
}

