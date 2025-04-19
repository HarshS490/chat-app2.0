"use client";
import useChat from "@/features/general/hooks/use-chat";
import { SendHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SocketMessageType } from "../schema";

export type Props = {
  chatId: string;
};

export const messageSchema = z.object({
  body: z.string(),
  file: z.instanceof(File).optional(),
});

export type MessageSchemaType = z.infer<typeof messageSchema>;
export type SendMessageType = z.infer<typeof messageSchema> & {
  chatId: string;
  name: string;
  createdBy: string;
};

function MessageInput({ chatId }: Props) {
  const { register, reset, handleSubmit } = useForm<MessageSchemaType>({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(messageSchema),
  });

  const { sendMessage } = useChat<SocketMessageType>({ chatId });

  const session = useSession();
  const onSubmit = useCallback(
    (data: MessageSchemaType) => {
      if (data.body.trim().length == 0) return;
      const user = session.data?.user;
      if (!user || !user.id || !user.name || !user.email || !user.image) return;

      const payload: SendMessageType = {
        body: data.body,
        file: data.file,
        chatId: chatId,
        createdBy: user.id,
        name: user.name,
      };

      if (payload.file) {
        // upload the file to cloudiary then send upon socket.
      } else {
        const message: SocketMessageType = {
          body: data.body,
          image: null,
          chatId: chatId,
          createdBy: {
            email: user.email,
            id: user.id,
            image: user.image,
            name: user.name,
          },
          public_id: null,
          isEdited: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        sendMessage(message);
      }
      reset();
    },
    [chatId, reset, sendMessage, session.data?.user]
  );

  return (
    <div className="mb-2 pr-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 w-full"
      >
        <div className="w-full flex gap-2 space-x-4 space-x-reverse">
          <input
            className="font-light py-2 px-4 bg-gray-200/85 text-black w-full rounded-full focus:outline-none "
            id="message"
            placeholder="Message..."
            {...register("body")}
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-blue-500 hover:opacity-75 transition p-2"
          >
            <SendHorizontalIcon className=""></SendHorizontalIcon>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
