import React from "react";
import { Users, UserPlus } from "lucide-react";
import Link from "next/link";

const NoChatsEmptyState: React.FC = () => {
  return (
    <div className="text-center p-8 max-w-md space-y-6">
      <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
        <Users className="w-10 h-10 text-secondary-foreground" />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">No chats yet</h2>
        <p className="text-muted-foreground">
          Start connecting with others by sending friend requests. Once
          accepted, your chats will appear here.
        </p>
      </div>
      <Link
        href={"/users"}
        className="min-w-max font-medium border border-gray-200  rounded-lg p-2 shadow-xs flex gap-2 justify-center items-center hover:shadow-sm"
      >
        <UserPlus className="w-5 h-5 mr-2 inline" />
        Add friends
      </Link>
    </div>
  );
};

export default NoChatsEmptyState;
