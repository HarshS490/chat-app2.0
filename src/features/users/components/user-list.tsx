import React from 'react'
import { PartialUser } from '../schema'
import UserBox from './user-box';

type Props = {
  items: PartialUser[];
}

function UsersList({items}: Props) {
  return (
    <div>
      <div className='text-2xl font-bold text-neutral-800 py-4'>
        People
      </div>
      <div className='flex flex-col'>
        {
          items.map((item:PartialUser)=>(
            <UserBox data={item} key={item.id}></UserBox>
          ))
        }
      </div>
    </div>
  )
}

export default UsersList