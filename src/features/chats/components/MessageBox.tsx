import React from "react";
import { FullMessageType, SocketMessageType } from "../schema";
import clsx from "clsx";
import { format } from "date-fns";
import CustomAvatar from "@/features/general/components/Avatar";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import deleteMessage from "../actions/deleteMessage";

export const MessageBox = React.memo(function MessageBox({
  data,
  isOwn,
  isLast,
  isFirst,
}: {
  data: FullMessageType | SocketMessageType;
  isOwn: boolean;
  isLast: boolean;
  isFirst: boolean;
}) {
  const container = clsx("flex gap-1 p-1 w-full items-end", {
    "justify-end": isOwn,
  });
  const body = clsx("flex flex-col gap-2 max-w-11/12 md:max-w-3/5 group ", {
    "items-end": isOwn,
    "items-start": !isOwn,
    "px-10": !isLast,
  });
  const message = clsx(
    "text-sm w-full overflow-hidden relative flex flex-col",
    {
      "bg-blue-600/80 text-white rounded-l-2xl": isOwn,
      "rounded-r-2xl bg-gray-100 ": !isOwn,
      "rounded-r-2xl": isOwn && !isLast,
      "rounded-tr-2xl": isOwn && isLast,
      "rounded-l-2xl": !isOwn && !isLast,
      "rounded-tl-2xl": !isOwn && isLast,
    },
    data.image
      ? "rounded-md shadow-md shadow-border border border-gray-300"
      : " py-2 px-3"
  );

  const time = clsx(
    "text-xs text-gray-500  justify-self-end  self-end flex-0 "
  );

  const usernameClasses = clsx("text-xs font-semibold", {
    "self-end ": isOwn,
    "self-start": !isOwn,
  });

  const clickHandler =async ()=>{
    try {
      await deleteMessage(data);
      toast.success("Message deleted!");
    }catch{
      toast.error("Failed to Delete message!")
    }
  }

  return (
    <div className={container}>
      {!isOwn && isLast && (
        <CustomAvatar isGroup={false} image={data.createdBy.image} />
      )}

      <div className={body}>
        {isFirst && <p className={usernameClasses}>{data.createdBy.name}</p>}
        <div
          className={clsx(
            isOwn ? "flex flex-row-reverse gap-2 " : "flex gap-2 "
          )}
        >
          <div className={message}>
            <p>{data.body}&nbsp;</p>
          </div>
          <div className="flex flex-col ">
            <Button
              type="button"
              variant={"ghost"}
              onClick={clickHandler}
              className="opacity-0 group-hover:opacity-100 cursor-pointer self-center"
            >
              <Trash2Icon className="text-red-500" />
            </Button>
            <p className={time}>{format(new Date(data.createdAt), "HH:mm")}</p>
          </div>
        </div>
      </div>
      {isOwn && isLast && (
        <CustomAvatar isGroup={false} image={data.createdBy.image} />
      )}
    </div>
  );
});
