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
import { FullMessageType, SocketMessageType } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { MessageBox } from "./MessageBox";
import { Loader2Icon } from "lucide-react";
import { useSocket } from "@/features/general/hooks/SocketProvider";
import ChatEmptyState from "./ChatEmptyState";

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

  // Message Fetching and Processing
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
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
      retry: 3,
    });

  const allMessages = useMemo(() => {
    if (!data?.pages) return [];
    const messages = [...data.pages].reverse().flatMap((page) => page.messages);
    const batches: FullMessageType[][] = [];
    let batch: FullMessageType[] = [];
    for (let i = 0; i < messages.length; i++) {
      if (
        batch.length === 0 ||
        messages[i].createdBy.id === batch[0].createdBy.id
      ) {
        batch.push(messages[i]);
      } else {
        batches.push(batch);
        batch = [];
        batch.push(messages[i]);
      }
    }
    if (batch.length !== 0) batches.push(batch);
    return batches;
  }, [data?.pages]);

  const batchWiseSocketMessages = useMemo(() => {
    const batches: SocketMessageType[][] = [];
    let batch: SocketMessageType[] = [];
    for (let i = 0; i < newMessages.length; i++) {
      if (
        batch.length == 0 ||
        newMessages[i].createdBy.id === batch[0].createdBy.id
      ) {
        batch.push(newMessages[i]);
      } else {
        batches.push(batch);
        batch = [newMessages[i]];
      }
    }
    if (batch.length !== 0) batches.push(batch);
    console.log(batches);
    return batches;
  }, [newMessages]);

  // Scroll Controllers
  const checkIfNearBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const threshold = 100;
    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;
    return height - position <= threshold;
  }, []);

  useEffect(() => {
    if (data?.pages.length === 1 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [data?.pages.length]);

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

  // Socket setup and Messages.
  const { joinRoom, setMessageHandler } = useSocket();
  const recieveMessages = useCallback((data: SocketMessageType) => {
    console.log("setting new messages");
    setNewMessages((prev) => [...prev, data]);
  }, []);

  useEffect(() => {
    console.log("new message updated");
  }, [newMessages]);

  useEffect(() => {
    joinRoom(chatId);
    setMessageHandler(recieveMessages);
  }, [chatId, joinRoom, setMessageHandler, recieveMessages]);

  return (
    <div ref={containerRef} className=" flex-1 p-2 overflow-y-auto w-full ">
      <div ref={topRef}></div>
      {isFetchingNextPage && (
        <div className="w-full flex  justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      {allMessages.map((batch) => {
        console.log(batch.length);
        return batch.map((msg, ind) => {
          return (
            <MessageBox
              key={msg.id}
              data={msg}
              isOwn={session.data?.user.id === msg.createdBy.id}
              isLast={batch.length - 1 === ind}
              isFirst={ind == 0}
            />
          );
        });
      })}

      {batchWiseSocketMessages.map((batch) => {
        return batch.map((msg, ind) => {
          const uid = uuidv4();
          return (
            <MessageBox
              key={uid}
              data={msg}
              isOwn={session.data?.user.id === msg.createdBy.id}
              isLast={ind === batch.length - 1}
              isFirst={ind == 0}
            />
          );
        });
      })}

      {!isFetching &&
        batchWiseSocketMessages.length === 0 &&
        allMessages.length === 0 && <ChatEmptyState />}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default Body;
