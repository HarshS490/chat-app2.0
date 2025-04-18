import Sidebar from "@/features/general/components/Sidebar";
import UsersList from "@/features/users/components/user-list";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <Sidebar>
      <div className="h-full">
        <aside className="px-2 h-full fixed inset-y-0 pb-22 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
          <UsersList />
        </aside>
        <div className="hidden lg:block lg:pl-80 h-full">{children}</div>
      </div>
    </Sidebar>
  );
}

export default layout;
