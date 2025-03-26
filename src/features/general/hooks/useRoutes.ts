import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { LucideProps, MessageCircle, SquareArrowLeft, UsersRound } from "lucide-react";

export interface route {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  active?: boolean;
  onClick?: ()=>void
};


const useRoutes = () => {
  const pathname = usePathname();
  const routes= useMemo<route[]>(
    () => [
      {
        label: "Chat",
        href: "/chat",
        icon: MessageCircle,
        active: pathname === "/chat",
      },
      {
        label: "users",
        href: "/users",
        icon: UsersRound,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: signOut,
        icon: SquareArrowLeft,
      },
    ],
    [pathname]
  );
  return routes;
};

export default useRoutes;
