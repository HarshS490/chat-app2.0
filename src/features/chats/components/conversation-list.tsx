"use client";
import React, { useState } from "react";
import { CompleteConversation } from "../schema";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";
import { useConversation } from "../hooks/useConversation";
import clsx from "clsx";

type Props = {
  initialItems: CompleteConversation[];
};

function ConversationList({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 w-full lg:block lg:w-80 overflow-y-auto border-r border-gray-200 bg-white",
        {
          hidden: isOpen,
          "md:w-[765px] md:max-lg:left-1/2 md:max-lg:-translate-x-2/4 block":
            !isOpen,
        }
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 ">
          <div className="text-2xl font-semibold text-neutral-800 ">
            Messages
          </div>
          <div className="cursor-pointer bg-gray-200 rounded-md p-2 hover:opacity-75 transition-colors ">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {items.map((item) => (
          <ConversationBox
            key={item.conversationId}
            data={item}
            selected={conversationId === item.conversationId}
          />
        ))}
      </div>
    </aside>
  );
}

export default ConversationList;
