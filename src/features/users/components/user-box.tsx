"use client";
import React from 'react'
import { PartialUser } from '../schema'
import { Avatar, AvatarFallback  } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

type Props = {
  data: PartialUser;
}

function UserBox({data}: Props) {
  return (
    <div className='my-1 p-2 flex flex-row flex-nowrap gap-4  items-center cursor-pointer hover:bg-neutral-200 rounded-sm transition-all'>
      <Avatar>
        <AvatarImage  src={`${data.image}`}/>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className='text-lg font-medium text-neutral-800'>
        {data.name?.toWellFormed()}
      </div>
    </div>
  )
}

export default UserBox