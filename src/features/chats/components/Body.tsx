"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMessages } from "../actions/getMessages";
import { useSession } from "next-auth/react";
import useChat from "@/features/general/hooks/use-chat";
import { SocketMessageType } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { MessageBox, SocketMessageBox } from "./MessageBox";
import { Loader2Icon } from "lucide-react";

type Props = {
  chatId: string;
};

function Body({ chatId }: Props) {
  const [newMessages, setNewMessages] = useState<SocketMessageType[]>([]);
  const queryKey = useMemo(() => [chatId], [chatId]);
  const session = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam = "" }) => fetchMessages({ pageParam, chatId }),
      getNextPageParam: (lastPage) => {
        return lastPage?.nextPage;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      initialPageParam: "",
    });

  const allMessages = useMemo(() => {
    if (!data?.pages) return [];
    return [...data.pages].reverse().flatMap((page) => page.messages);
  }, [data?.pages]);

  useEffect(() => {
    if (data?.pages.length === 1 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [data?.pages.length]);

  const checkIfNearBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const threshold = 100;
    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;
    return height - position <= threshold;
  }, []);

  useEffect(() => {
    if (newMessages.length === 0) return;

    if (checkIfNearBottom() && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessages, checkIfNearBottom]);

  useEffect(() => {
    const top = topRef.current;
    const container = containerRef.current;
    if (!top || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const noMessages = data?.pages.length === 0 || allMessages.length == 0;
        if (
          entry.isIntersecting &&
          !isFetchingNextPage &&
          hasNextPage &&
          !noMessages
        ) {
          fetchNextPage();
        }
      },
      {
        root: container,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(top);

    return () => {
      observer.disconnect();
    };
  }, [
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    allMessages.length,
    data?.pages.length,
  ]);

  const recieveMessages = useCallback((data: SocketMessageType) => {
    setNewMessages((prev) => [...prev, data]);
  }, []);

  useChat({ chatId, recieveMessages });

  return (
      <div
        ref={containerRef}
        className=" flex-1 p-2 overflow-y-auto w-full items-end"
      >
        <div ref={topRef}></div>
        {isFetchingNextPage && (
          <div className="w-full flex  justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
        {allMessages.map((msg) => {
          return (
            <MessageBox
              key={msg.id}
              data={msg}
              isOwn={session.data?.user.id === msg.userId}
            />
          );
        })}

        {newMessages.map((msg) => {
          const uid = uuidv4();
          return (
            <SocketMessageBox
              key={uid}
              data={msg}
              isOwn={session.data?.user.id === msg.createdBy}
            />
          );
        })}
        <div ref={bottomRef}></div>
      </div>
  );
}

export default Body;
