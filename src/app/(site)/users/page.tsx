import Sidebar from '@/features/general/components/Sidebar';
import { getUsers } from '@/features/users/actions/getUsers';
import UsersList from '@/features/users/components/user-list';
import React from 'react'


async function page() {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className='h-full'>
        <aside className='fixed px-2 inset-y-0 pb-22 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'>
          <UsersList items={users}/>
        </aside>
      </div>
    </Sidebar>
  )
}

export default page;