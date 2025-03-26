import { getCurrentUser } from '@/features/users/actions/getCurrentUser';
import React from 'react'
import DesktopSideBar from './DesktopSideBar';

type Props = {
  children: React.ReactNode;
}

async function Sidebar({children}: Props) {
  const currentuser = await getCurrentUser(); 
  console.log(currentuser);
  return (
    <div className='h-full'>
      <DesktopSideBar currentuser={currentuser}/>
      {children}
    </div>
  )
}

export default Sidebar