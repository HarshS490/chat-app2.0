"use client";
import React, { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";



type AuthButtonProps = {
  provider: "google" | "github";
  onClick: () => void;
};

const AuthButton: React.FC<AuthButtonProps> = ({ provider, onClick }) => {
  const isGoogle = provider === "google";

  return (
    <Button
      onClick={onClick}
      className={`flex items-center justify-center w-full py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 
        ${
          isGoogle
            ? "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        } shadow-sm transform hover:-translate-y-0.5`}
    >
      <span className="flex items-center">
        {isGoogle ? <FcGoogle className="size-5 mx-2"/> : <FiGithub className="size-5 mx-2"/>}
        Sign in with {isGoogle ? "Google" : "GitHub"}
      </span>
    </Button>
  );
};

type LoginCardProps = {
  children: ReactNode;
};

const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl">
      {children}
    </div>
  );
};

function AuthForm() {
  return (
    
    <div>
      <div>
        <div className="min-h-screen  bg-neutral-200 flex items-center justify-center p-4 relative overflow-hidden">
          <LoginCard>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-blue-800 to-blue-900 bg-blue-600 mb-6 shadow-lg transform transition-transform hover:scale-105 duration-300">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to PulseChat
              </h1>
              <p className="text-gray-500 mb-8 text-center">
                Connect with your friends fast and securely.
              </p>

              <div className="space-y-4 w-full">
                <AuthButton
                  provider="google"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/chat", redirect: true })
                  }
                />
                <AuthButton
                  provider="github"
                  onClick={() =>
                    signIn("github", { callbackUrl: "/chat", redirect: true })
                  }
                />
              </div>

              <div className="mt-8 text-sm text-gray-500 text-center">
                <p>
                  By logging in, you agree to our{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </LoginCard>

          <footer className="absolute bottom-4 text-gray-400 text-sm">
            © {new Date().getFullYear()} ChatSync. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
