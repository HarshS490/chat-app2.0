"use client";

import { PartialConversation } from "../schema";
import { useMemo } from "react";
import { useSession } from "next-auth/react";


const useOtherUser = (data:PartialConversation)=>{
  const session = useSession();
  

  const otherUser = useMemo(()=>{
    console.log(session.data);
    const otherUser = data.conversation.users.filter((user)=> user.user.email!== session?.data?.user?.email );

    if(otherUser.length==0){
      return data.conversation.users[0];
    }
    return otherUser[0];
  },[session.data,data.conversation]);

  return otherUser;
}

export default useOtherUser;

