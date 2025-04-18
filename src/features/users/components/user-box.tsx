"use client";
import React, { useMemo } from "react";
import { PartialUser } from "../schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

type Props = {
  data: PartialUser;
  handleModalOpen: (data: PartialUser) => void;
};

function UserBox({ data, handleModalOpen }: Props) {
  const session = useSession();
  const isCurrentUser = useMemo(() => {
    if (session.data?.user.id === data.id) {
      return true;
    }
    return false;
  }, [session, data]);
  const handleClick = () => {
    if (!isCurrentUser) {
      handleModalOpen(data);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="my-1 p-2 flex flex-row flex-nowrap gap-4  items-center cursor-pointer hover:bg-neutral-200 rounded-sm transition-all"
    >
      <Avatar>
        <AvatarImage src={`${data.image}`} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="text-lg font-medium text-neutral-800">
        {data.name?.toWellFormed()}
      </div>
    </div>
  );
}

export default UserBox;
