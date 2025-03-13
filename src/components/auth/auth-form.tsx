"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

type AuthFormProps = {
  type: "login" | "signup";
};

function AuthForm({ type }: AuthFormProps) {
  // cons f
  return (
    <div className="bg-neutral-300 w-full h-screen flex items-center justify-center gap-2">
      <div className="bg-white sm:rounded-lg w-full h-full  sm:w-8/12 sm:h-max transition-all">
        <div className="w-1/2 p-3 flex flex-col items-center gap-2 ">
          <h1 className="font-semibold text-2xl">
            {type.toString()[0].toUpperCase() + type.toString().substring(1)}
          </h1>
          <div>{/* Auth Form goes here */}</div>
          <div>
            <Button variant={"default"} className="flex gap-1.5 cursor-pointer" onClick={()=>signIn("google",{callbackUrl:"/conversations",redirect:true})}>
              <FcGoogle />
              <span>Sign In with Google</span>
            </Button>
          </div>
        </div>
        <div className="w-1/2 hidden sm:block border-l border-l-gray-400">
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
