import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { LucideProps, MessageCircle, SquareArrowLeft, UsersRound,Bell } from "lucide-react";

export interface route {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  active?: boolean;
  onClick?: ()=>void
};



const useRoutes = () => {
  const pathname = usePathname();
  const activeRoute = useMemo(()=>(pathname.split('/')[1]),[pathname]);
  const routes= useMemo<route[]>(
    () => [
      {
        label: "Chat",
        href: "/chat",
        icon: MessageCircle,
        active: activeRoute === "chat",
      },
      {
        label: "users",
        href: "/users",
        icon: UsersRound,
        active: activeRoute === "users",
      },
      {
        label:"Notifications",
        href:"#",
        icon: Bell,
      },
      {
        label: "Logout",
        href: "#",
        onClick: signOut,
        icon: SquareArrowLeft,
      },
      
    ],
    [activeRoute]
  );
  return routes;
};

export default useRoutes;
