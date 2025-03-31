"use client";
import React, { useState } from "react";
import { PartialConversation } from "../schema";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";

type Props = {
  initialItems: PartialConversation[];
};

function ConversationList({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);

  return (
    <aside
      className={
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 w-full md:w-[765px] md:max-lg:left-1/2 md:max-lg:-translate-x-2/4 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block"
      }
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 ">
          <div className="text-2xl font-semibold text-neutral-800 ">
            Messages
          </div>
          <div
            className="cursor-pointer bg-gray-200 rounded-md p-2 hover:opacity-75 transition-colors "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {items.map((item) => (
          <ConversationBox key={item.conversationId} data={item} />
        ))}
      </div>
    </aside>
  );
}

export default ConversationList;
