import React from "react";
import { FullMessageType, SocketMessageType } from "../schema";
import clsx from "clsx";
import { format } from "date-fns";

export function SocketMessageBox({
  data,
  isOwn,
}: {
  data: SocketMessageType;
  isOwn: boolean;
}) {
  const container = clsx("flex gap-1 p-1 w-full", { "justify-end": isOwn });
  const body = clsx("flex flex-col gap-2 max-w-1/2", { "items-end": isOwn });
  const message = clsx(
    "text-sm w-fit overflow-hidden relative ",
    {
      "bg-[#0F54AE] text-white rounded-l-2xl rounded-br-2xl": isOwn,
      "rounded-r-2xl rounded-bl-md bg-gray-100 self-start": !isOwn,
    },
    data.image
      ? "rounded-md shadow-md shadow-border border border-gray-300"
      : " py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={body}>
        <div
          className={clsx(
            isOwn ? "text-xs text-gray-500" : "text-xs text-gray-500 self-start"
          )}
        >
          {data.name}
        </div>
        <div
          className={clsx(
            isOwn ? "flex flex-row-reverse gap-2 " : "flex gap-2 "
          )}
        >
          <div className={message}>
            <p>{data.body}&nbsp;</p>
          </div>
          <p className="text-xs text-gray-500 font-semibold self-end flex-grow-0 flex-shrink-0">
            {format(new Date(data.createdAt), "p")}
          </p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  data: FullMessageType;
  isOwn: boolean;
};

export function MessageBox({ data, isOwn }: Props) {
  const container = clsx("flex gap-1 p-1 w-full", { "justify-end": isOwn });
  const body = clsx("flex flex-col gap-2 max-w-1/2", { "items-end": isOwn });
  const message = clsx(
    "text-sm w-fit overflow-hidden relative ",
    {
      "bg-[#0F54AE] text-white rounded-l-2xl rounded-br-2xl": isOwn,
      "rounded-r-2xl rounded-bl-md bg-gray-100 self-start": !isOwn,
    },
    data.image
      ? "rounded-md shadow-md shadow-border border border-gray-300"
      : " py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={body}>
        <div
          className={clsx(
            isOwn ? "text-xs text-gray-500" : "text-xs text-gray-500 self-start"
          )}
        >
          {data.createdBy.name}
        </div>
        <div
          className={clsx(
            isOwn ? "flex flex-row-reverse gap-2 " : "flex gap-2 "
          )}
        >
          <div className={message}>
            <p>{data.body}&nbsp;</p>
          </div>
          <p className="text-xs text-gray-500 font-semibold self-end flex-grow-0 flex-shrink-0">
            {format(new Date(data.createdAt), "p")}
          </p>
        </div>
      </div>
    </div>
  );
}
