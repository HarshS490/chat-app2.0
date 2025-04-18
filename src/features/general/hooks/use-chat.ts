"use client";
import { SocketMessageType } from "@/features/chats/schema";
import { Events, getSocket } from "@/lib/socket.config";
import { useCallback, useEffect, useMemo } from "react";

export default function useChat<T>({
  chatId,
  recieveMessages,
}: {
  chatId: string;
  recieveMessages?: (data: SocketMessageType) => void;
}) {
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: chatId,
    };
    return socket.connect();
  }, [chatId]);

  useEffect(() => {
    socket.on(Events.MESSAGE, (data: SocketMessageType) => {
      console.log("The socket message is : ", data);
      if (recieveMessages) {
        console.log("receiving messages");
        recieveMessages(data);
      }
    });
    return () => {
      socket.close();
    };
  }, [socket, recieveMessages]);

  const sendMessage = useCallback(
    (data?: T) => {
      console.log("sending message");
      console.log(data);
      socket.emit(Events.MESSAGE, { ...data, timeStamp: Date.now() });
    },
    [socket]
  );

  return {
    sendMessage,
    socket,
  };
}
