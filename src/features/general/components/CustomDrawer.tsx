"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FriendRequests from "@/features/users/components/friend-requests";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { route } from "../hooks/useRoutes";

type Props = {
  route: route;
  direction: "top" | "bottom" | "left" | "right";
};

function NotificationDrawer({ route }: Props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 950px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="relative">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <li
            className={clsx(
              "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold cursor-pointer ",
              {
                "text-black bg-neutral-200": route.active,
                "text-gray-500 hover:bg-gray-100": !route.active,
              }
            )}
          >
            <route.icon />
          </li>
        </SheetTrigger>
        <SheetContent side="bottom" className="pb-30 z-40 w-full">
          <SheetHeader>
            <SheetTitle>{route.label}</SheetTitle>
          </SheetHeader>
          <FriendRequests />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export { NotificationDrawer };
