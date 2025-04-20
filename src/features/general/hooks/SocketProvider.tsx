"use client";
import { CompleteConversation, SocketMessageType } from "@/features/chats/schema";
import { Events, getSocket } from "@/lib/socket.config";
import { useQueryClient } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  // useState,
} from "react";

interface SocketContextType {
  sendMessage: (data: SocketMessageType) => void;
  setMessageHandler: (handler: (data: SocketMessageType) => void) => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  // const [messageHandler, setMessageHandler] = useState<(data:SocketMessageType)=>void>(()=>()=>{});
  const currentRoomRef = useRef<Set<string>>(new Set());
  const messageHandlerRef = useRef<(data: SocketMessageType) => void>(() => {});
  const socket = useMemo(() => getSocket(), []);

  //Methods 
  const setMessageHandler = useCallback(
    (handler: (data: SocketMessageType) => void) => {
      console.log("message handler set");
      messageHandlerRef.current = handler;
    },
    []
  );

  const queryClient = useQueryClient();
  
  const updateConversations = useCallback((message:SocketMessageType)=>{
    queryClient.setQueryData(["Conversations"],(old: CompleteConversation[] | undefined)=>{
      if(!old) return [];
      const idx = old.findIndex((c)=> c.conversationId===message.chatId);
      if(idx==-1) return old;
      const oldConversation = old[idx].conversation; 
      const updated={
        ...old[idx],
        conversation:{
          ...oldConversation,
          messages:[
            {
              createdBy:{
                name: message.createdBy.name,
              },
              id: "",
              image: message.image,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt,
              public_id: message.public_id,
              isEdited: message.isEdited,
              conversationId: message.chatId,
              body: message.body,
              userId: message.createdBy.id,

            }

          ]
        }
      };
      const updatedList = [...old];
      updatedList.splice(idx,1);
      return [updated,...updatedList];
    })
  },[queryClient]);


  const onMessageRecieve = useCallback(
    (data: SocketMessageType) => {
      console.log(" Recieving message");
      messageHandlerRef.current(data);
      updateConversations(data);
    },
    [messageHandlerRef,updateConversations]
  );

  


  const joinRoom = useCallback((room: string) => {
    if (!currentRoomRef.current.has(room)) {
      socket.emit(Events.JOIN, { room }, () => {
        console.log(`Successfully joined room: ${room}`);
        currentRoomRef.current.add(room);
      });
    }
  }, [socket,currentRoomRef]);

  const leaveRoom = useCallback(
    (room: string) => {
      if (currentRoomRef.current.has(room)) {
        socket.emit(Events.LEAVE, {room});
        currentRoomRef.current.delete(room);
        console.log(`Left Room : ${room}`);
      }
    },
    [socket, currentRoomRef]
  );

  const sendMessage = useCallback(
    (data: SocketMessageType) => {
      if (!socket.connected) {
        console.log("socke not connected");
        return;
      }
      socket.emit(Events.MESSAGE, {message:{ ...data, timeStamp: Date.now() }, room: data.chatId});
    },
    [socket]
  );

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    // setting up handlers.
    console.log("setting up handlers");
    socket.on(Events.MESSAGE, onMessageRecieve);

    return () => {
      //remove handlers
      console.log("closing connections")
      socket.off(Events.MESSAGE, onMessageRecieve);
      socket.disconnect();
      
    };
  }, [socket, onMessageRecieve]);

  return (
    <SocketContext.Provider
      value={{ sendMessage, setMessageHandler, joinRoom, leaveRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};
