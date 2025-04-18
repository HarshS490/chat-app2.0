"use client";
import React, { useMemo, useState } from "react";
import { PartialConversation } from "../schema";
import useOtherUser from "../hooks/useOtherUser";
import Link from "next/link";
import { ChevronLeftIcon, Ellipsis } from "lucide-react";
import CustomAvatar from "@/features/general/components/Avatar";

type Props = {
  data: PartialConversation;
};

function Header({ data }: Props) {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const statusText = useMemo(() => "Active", []);
  const otherUser = useOtherUser(data);

  return (
    <div>
    {/* TODO: Create a profile drawer here */}
      <div className="w-full flex border-b-[1px] py-2 sm:px-4 lg:px-6 justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link
            href="/chat"
            className="lg:hidden hover:bg-gray-100 rounded-md p-1"
          >
            <ChevronLeftIcon size={32} />
          </Link>
          {
            <CustomAvatar
              image={
                data.isGroup
                  ? data.image
                  : otherUser.user.image
              }
              isGroup={data.isGroup}
            ></CustomAvatar>
          }
          <div className="flex flex-col">
            <p className="text-base font-medium text-gray-900">
              {data.name || otherUser.user.name}
            </p>
            <p className="text-sm text-gray-600 ">{statusText}</p>
          </div>
        </div>
        <div
          className="active:scale-105 transition-transform"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <Ellipsis></Ellipsis>
        </div>
      </div>
    </div>
  );
}

export default Header;
