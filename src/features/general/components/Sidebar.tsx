import { getCurrentUser } from "@/features/users/actions/getCurrentUser";
import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";

type Props = {
  children: React.ReactNode;
};

async function Sidebar({ children }: Props) {
  const currentuser = await getCurrentUser();
  return (
    <div className="h-dvh">
      <DesktopSideBar currentuser={currentuser} />
      <main className="lg:pl-20 h-full">{children}</main>
      <MobileFooter />
    </div>
  );
}

export default Sidebar;
