"use client";
import React from "react";
import { getRequests } from "../actions/getRequests";
import FriendRequestList from "./FriendRequestList";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/features/chats/components/Loading";

function FriendRequests() {
  const { data, isFetching } = useQuery({
    queryKey: ["Requests"],
    queryFn: getRequests,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="px-1">
      {data && data.length > 0 ? (
        <FriendRequestList data={data}></FriendRequestList>
      ) : isFetching ? (
        <Loading />
      ) : (
        <div className="p-2 text-muted-foreground">
          No Friend Requests found
        </div>
      )}
    </div>
  );
}

export default FriendRequests;
