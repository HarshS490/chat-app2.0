"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type Props = {
  image: string | null;
  isGroup: boolean;
};

function CustomAvatar({ image, isGroup }: Props) {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src={
          image || (isGroup?"/groupPlaceholder.png":"/userplaceholder.jpg")
        }
      ></AvatarImage>
      <AvatarFallback>{isGroup ? "G" : "U"}</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
