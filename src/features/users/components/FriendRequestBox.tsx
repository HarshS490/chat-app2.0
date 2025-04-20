"use client";
import React, { useCallback, useMemo, useState } from "react";
import { FullFriendRequest } from "../schema";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import CustomAvatar from "@/features/general/components/Avatar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import Loading from "@/features/chats/components/Loading";

type Props = {
  request: FullFriendRequest;
};

function FriendRequestBox({ request }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const currentUser = useMemo(() => session.data?.user, [session.data?.user]);
  const acceptRequest = useCallback(() => {
    setIsLoading(true);
    axios
      .post(
        `${API_URL}/friend/accept`,
        {
          requestId: request.id,
          friendId: request.senderId,
        },
        {
          headers: {
            Authorization: session.data?.backendToken,
          },
        }
      )
      .then((response) => {
        router.push(`/chat/${response.data.newConversation.id}`);
        toast.success("Friend Request accepted!", {
          id: "FRIEND_REQUEST",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cloudn't  accept request", {
          id: "CONVERSATION_FETCH",
        });
      })
      .finally(() => setIsLoading(false));
  }, [session.data?.backendToken, router, request]);

  const declineRequest = useCallback(() => {
    axios
      .post(
        `${API_URL}/friend/decline`,
        {
          requestId: request.id,
        },
        {
          headers: {
            Authorization: session.data?.backendToken,
          },
        }
      )
      .then(() =>
        toast("Declined Request", {
          id: "FRIEND_REQUEST_REJECTED",
        })
      );
  }, [request.id, session.data?.backendToken]);

  return (
    <div className="flex w-full gap-2 items-center justify-center   border-gray-200 rounded-xl hover:bg-gray-200 p-2">
      {request.sender.id === currentUser?.id ? (
        <CustomAvatar image={request.receiver.image} isGroup={false} />
      ) : (
        <CustomAvatar image={request.sender.image} isGroup={false} />
      )}
      <div className="flex justify-between gap-4 grow items-center">
        <div>
          <h2 className="font-semibold text-lg">{request.sender.name}</h2>
          <p className="text-xs">Sent a friend request</p>
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : request.status === "pending" &&
          request.receiverId === currentUser?.id ? (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={"default"}
              className="rounded-full size-10 cursor-pointer bg-red-400 hover:bg-red-400/80"
              size={"icon"}
              onClick={declineRequest}
            >
              <X className="text-white"></X>
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              className="rounded-full cursor-pointer bg-blue-500 hover:bg-blue-500/80 size-10"
              onClick={acceptRequest}
            >
              <Check className="text-white"></Check>
            </Button>
          </div>
        ) : (
          <p
            className={clsx({
              "text-blue-500 text-sm": request.status === "accepted",
              "text-gray-500 text-sm": request.status === "pending",
            })}
          >
            {request.status}
          </p>
        )}
      </div>
    </div>
  );
}

export default FriendRequestBox;
