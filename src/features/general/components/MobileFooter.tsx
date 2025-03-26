"use client";

import useRoutes from "../hooks/useRoutes";
import MobileItem from "./MobileItem";


const MobileFooter = ()=>{
  const routes = useRoutes();

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center border-t-[1px] lg:hidden bg-white">
      {
        routes.map((route)=>(
          <MobileItem key={route.href} route={route}/>
        ))
      }
    </div>
  )
}

export default MobileFooter