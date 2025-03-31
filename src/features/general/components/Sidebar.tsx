import { getCurrentUser } from '@/features/users/actions/getCurrentUser';
import React from 'react'
import DesktopSideBar from './DesktopSideBar';
import MobileFooter from './MobileFooter';

type Props = {
  children: React.ReactNode;
}

async function Sidebar({children}: Props) {
  const currentuser = await getCurrentUser(); 
  console.log(currentuser);
  return (
    <div className='h-full'>
      <DesktopSideBar currentuser={currentuser}/>
      <MobileFooter/>
      <main className='lg:pl-20 h-full'>
      {
        children
      }
      </main>
    </div>
  )
}

export default Sidebar