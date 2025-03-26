"use client";
import { SessionUser } from '@/features/users/schema';
import React from 'react';
import useRoutes from '../hooks/useRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DesktopItem from './DesktopItem';

type Props = {
  currentuser:SessionUser|null;
}

function DesktopSideBar({currentuser}: Props) {
  const routes = useRoutes();

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-5 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul className='flex flex-col items-center space-y-1'>
          {routes.map((item)=>(
            <DesktopItem key={item.label} route={item}/>
          ))}
        </ul>
      </nav>
      <nav className='mt-4 flex flex-cl justify-between items-center '>
          <div className='cursor-pointer hover:opacity-75 transition'>
            <Avatar>
              <AvatarImage src={currentuser?.image}/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
      </nav>
    </div>
  )
}

export default DesktopSideBar