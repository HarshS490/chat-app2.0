"use client";
import React, { useState } from "react";
import { PartialUser } from "../schema";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_URL } from "@/lib/apiEndPoints";
import toast from "react-hot-toast";
import Modal from "@/features/general/components/Modal";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

type Props = {
  handleClose: () => void;
  data: PartialUser | null;
  isOpen: boolean;
};

function FriendRequestModal({ handleClose, data, isOpen }: Props) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSend = () => {
    if (!data) return;
    setIsLoading(true);
    axios
      .post(
        `${API_URL}/friendrequest/send`,
        {
          friendId: data.id,
        },
        {
          headers: {
            Authorization: session.data?.backendToken,
          },
        }
      )
      .then(() => toast.success("Friend Request sent"))
      .then(() => handleClose())
      .catch((error) => {
        toast.error(error.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className="rounded-xl shadow-sm  shadow-card bg-white w-3/4   min-w-60 p-4 max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="tracking-wide text-md sm:text-xl font-semibold">
            Friend Request
          </h1>
          <div>
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              className="rounded-full hover:bg-gray-400/40 cursor-pointer"
              onClick={handleClose}
              disabled={isLoading}
            >
              <X className="size-7"></X>
            </Button>
          </div>
        </div>
        <p className="mb-4">
          Send a friend request to{" "}
          <span className="text-sky-600 font-semibold">{data?.name}</span>?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            disabled={isLoading}
            onClick={handleSend}
            type="button"
            variant={"default"}
            className="bg-blue-600 hover:bg-blue-700/85 cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin"></Loader2> : <></>}
            Send
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            variant={"default"}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default FriendRequestModal;
