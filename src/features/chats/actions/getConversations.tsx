import { API_URL } from "@/lib/apiEndPoints"
import axios from "axios"
import { CompleteConversation } from "../schema";
import { auth } from "@/lib/authOptions";

const getConversations = async ()=>{
  try {
    const session = await auth();
    const token = session?.backendToken;
    const response = await axios.get(`${API_URL}/chats/all`,{
      headers: {
        "Authorization" : token,
      } 
    });
    const conversations: CompleteConversation[] = response.data.conversations;
    // console.log(conversations);
    return conversations;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export {getConversations};