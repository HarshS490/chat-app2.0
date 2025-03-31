import { getConversations } from '@/features/chats/actions/getConversations'
import ConversationList from '@/features/chats/components/conversation-list'
import Loading from '@/features/chats/components/Loading'
import { PartialConversation } from '@/features/chats/schema'
import Sidebar from '@/features/general/components/Sidebar'
import React, { Suspense } from 'react'

type Props = {
  children:React.ReactNode
}



async function layout({children}: Props) {
  const conversations:PartialConversation[] = await getConversations();
  console.log(conversations);
  return (
    <div>
      <Sidebar>
        
        <div className='h-full'>
          <ConversationList initialItems = {conversations} />
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>

        </div>
      </Sidebar>
    </div>
  )
}

export default layout