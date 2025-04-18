import React from "react";
import { route } from "../hooks/useRoutes";
import Link from "next/link";
import toast from "react-hot-toast";
import { NotificationDrawer } from "./CustomDrawer";

type Props = {
  route: route;
};

function MobileItem({ route }: Props) {
  const handleClick = () => {
    if (route.onClick) {
      toast.success("Signed Out");
      return route.onClick();
    }
  };

  if (route.label === "Notifications") {
    return <NotificationDrawer route={route} direction="bottom" />;
  }
  return (
    <Link
      href={route.href}
      onClick={handleClick}
      className="group flex gap-x-3 leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100"
    >
      {<route.icon />}
    </Link>
  );
}

export default MobileItem;
