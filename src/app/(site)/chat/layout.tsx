import ConversationList from "@/features/chats/components/conversation-list";
import Sidebar from "@/features/general/components/Sidebar";
import { SocketProvider } from "@/features/general/hooks/SocketProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  return (
    <Sidebar>
      <div className="h-full">
        <SocketProvider>
          <ConversationList />
          {children}
        </SocketProvider>
      </div>
    </Sidebar>
  );
}

export default layout;
