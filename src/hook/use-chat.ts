"use client";
import { getSocket } from "@/lib/socket.config";
import { useCallback, useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export enum Events {
  MESSAGE = "MESSAGE",
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  ERROR = "ERROR",
}

export default function useChat<T>({
  conversationId,
}: {
  conversationId: string;
}) {


  const socket = useMemo(() => {

    const socket = getSocket();
    socket.auth = {
      room: conversationId,
    };
    return socket.connect();
    
  }, [conversationId]);

  useEffect(() => {
    socket.on(Events.MESSAGE, (data: any) => {
      console.log("The socket message is : ", data);
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = useCallback(
    (event: Events, data?: T) => {
      console.log("sending messages");
      socket.emit(event, { data, id: uuidV4() });
    },
    [socket]
  );

  return {
    close: socket.close,
    sendMessage,
    socket,
  };
}
