import { getConversationById } from "@/features/chats/actions/getConversationById";
import Body from "@/features/chats/components/Body";
import Header from "@/features/chats/components/Header";
import MessageInput from "@/features/chats/components/MessageInput";
import { PartialConversation } from "@/features/chats/schema";
import React from "react";

type chatProps = {
  params: Promise<{ id: string }>;
};

async function chatroom({ params }: chatProps) {
  const chatId = (await params).id;
  console.log(chatId);
  const conversation: PartialConversation | null = await getConversationById(
    chatId
  );

  if (!conversation) {
    return <div className="lg:pl-80 h-full"></div>;
  }

  

  return (
    <div className=" lg:pl-80 h-full">
      <div className="h-full flex flex-col py-2 gap-2 ">
        <Header data={conversation} />
        <Body chatId={chatId}/>
        <MessageInput chatId={chatId}></MessageInput>
      </div>
    </div>
  );
}

export default chatroom;
