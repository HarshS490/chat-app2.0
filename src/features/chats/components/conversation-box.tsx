import React, { useCallback, useMemo } from "react";
import { CompleteConversation } from "../schema";
import { useRouter } from "next/navigation";
import useOtherUser from "../hooks/useOtherUser";
import CustomAvatar from "@/features/general/components/Avatar";
import clsx from "clsx";
import {  differenceInCalendarDays, format } from "date-fns";

type Props = {
  data: CompleteConversation;
  selected: boolean;
};

function ConversationBox({ data, selected }: Props) {
  const router = useRouter();

  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/chat/${data.conversationId}`);
  }, [data.conversationId, router]);

  const lastMessage = useMemo(() => {
    const messages = data.conversation.messages || [];
    return messages[0];
  }, [data.conversation.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  const time = useMemo(()=>{
    const currentDate = new Date();
    if(differenceInCalendarDays(data.conversation.lastMessageAt,currentDate) == 0){
      // return time format
      return format(data.conversation.lastMessageAt,"HH:mm");
    }
    // return date format
    return format(data.conversation.lastMessageAt,"dd/MM/yy")
  },[data.conversation.lastMessageAt]);

  return (
    <div
      onClick={handleClick}
      className={
        clsx("w-full p-2 my-1 relative flex items-center space-x-3  rounded-lg transition cursor-pointer",{
          "hover:bg-neutral-100":!selected,
          "bg-neutral-200":selected
        })
      }
    >
      <CustomAvatar
        image={
          data.conversation.isGroup
            ? data.conversation.image
            : otherUser.user.image
        }
        isGroup={data.conversation.isGroup}
      />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between mb-1 items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            <div>
              <p className="text-base font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                {data.conversation.name || otherUser.user.name}
              </p>
            </div>
            <div className="text-xs flex justify-between gap-2 relative overflow-hidden  overflow-ellipsis">
              <p className="overflow-hidden overflow-ellipsis line-clamp-1 min-w-20 text-neutral-600">
                {lastMessageText}
              </p>
              {lastMessage?.createdAt && (
                <span className="text-xs block shrink-0">{time}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
