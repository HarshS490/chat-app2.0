"use client";

import { useConversation } from "@/features/chats/hooks/useConversation";
import useRoutes from "../hooks/useRoutes";
import MobileItem from "./MobileItem";


const MobileFooter = ()=>{
  const routes = useRoutes();
  const {isOpen} = useConversation();
  if(isOpen) return null;
  return (
    <div className="z-50 fixed justify-between w-full bottom-0 flex items-center border-t-[1px] lg:hidden bg-white">
      {
        routes.map((route)=>(
          <MobileItem key={route.label} route={route}/>
        ))
      }
    </div>
  )
}

export default MobileFooter