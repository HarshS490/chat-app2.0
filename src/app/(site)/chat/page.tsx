export const dynamic = "force-dynamic";
import EmptyChatState from "@/features/chats/components/EmptyState";
import React from "react";

async function page() {
  return <div className="hidden lg:block h-full">
    <EmptyChatState />
  </div>;
}

export default page;
