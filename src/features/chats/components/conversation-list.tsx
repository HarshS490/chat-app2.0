"use client";
import React, { useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";
import { useConversation } from "../hooks/useConversation";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../actions/getConversations";
import Loading from "./Loading";
import toast from "react-hot-toast";
import NoChatsEmptyState from "./NoChatsEmptyState";
import ChatsErrorState from "./ChatsErrorState";


function ConversationList() {
  const { conversationId, isOpen } = useConversation();

  const {data,isFetching, isError,error, refetch} = useQuery({
    queryKey:["Conversations"],
    queryFn: getConversations,
    refetchOnWindowFocus:false,
    retry:2,
  });
  
  useEffect(()=>{
    if(!isFetching && isError){
      toast.error(error.message || "Error occured while fetching chats!", {
        id: "FETCH_CONVO_ERROR",
      });
    }
  },[isError,error?.message,isFetching])
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
      <div className="flex justify-between mb-4 p-4 border-b border-b-neutral-200">
        <div className="text-2xl font-semibold text-neutral-800 ">
          Messages
        </div>
        <div className="cursor-pointer bg-gray-200 rounded-md p-2 hover:opacity-75 transition-colors ">
          <MdOutlineGroupAdd size={20} />
        </div>
      </div>
      <div className="px-5">

        {data && data.map((item) => (
          <ConversationBox
            key={item.conversationId}
            data={item}
            selected={conversationId === item.conversationId}
          />
        ))}
        {
          isFetching && <Loading></Loading>
        }
        {
          !isFetching && data && data.length<=1 && <NoChatsEmptyState/>
        }
        {
          !isFetching && isError && <ChatsErrorState onRetry={()=>{refetch()}} />
        }
      </div>
    </aside>
  );
}

export default ConversationList;
