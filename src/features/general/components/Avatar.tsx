"use client";
import { Avatar} from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

type Props = {
  image: string | null;
  isGroup: boolean;
};

function CustomAvatar({ image, isGroup }: Props) {
  return (
    <Avatar className="cursor-pointer">
      <Image
        src={
          image || (isGroup?"/groupPlaceholder.png":"/userplaceholder.jpg")
        }
        alt="profilePic"
        width={32}
        height={32}
      ></Image>
    </Avatar>
  );
}

export default CustomAvatar;
