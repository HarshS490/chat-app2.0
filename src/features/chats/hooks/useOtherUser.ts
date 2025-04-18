"use client";

import { CompleteConversation, PartialConversation} from "../schema";
import { useMemo } from "react";
import { useSession } from "next-auth/react";


const useOtherUser = (data:CompleteConversation | PartialConversation)=>{
  const session = useSession();
  

  const otherUser = useMemo(()=>{
      const users = "conversation" in data?data.conversation.users:data.users;
      const  otherUsers = users.filter((user)=> user.user.email!== session?.data?.user?.email );
      if(otherUsers.length==0){
        return users[0];
      }
      return otherUsers[0];
  },[session.data,data]);

  return otherUser;
}

export default useOtherUser;

