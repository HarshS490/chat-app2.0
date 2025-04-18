import { getConversations } from "@/features/chats/actions/getConversations";
import ConversationList from "@/features/chats/components/conversation-list";
import Loading from "@/features/chats/components/Loading";
import { CompleteConversation } from "@/features/chats/schema";
import Sidebar from "@/features/general/components/Sidebar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  const conversations: CompleteConversation[] = await getConversations();
  console.log(conversations);
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </Sidebar>
  );
}

export default layout;
