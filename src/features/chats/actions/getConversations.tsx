"use server";
import { API_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";
import { CompleteConversation } from "../schema";
import { auth } from "@/lib/authOptions";

const getConversations = async () => {
  try {
    const session = await auth();
    const token = session?.backendToken;
    const response = await axios.get(`${API_URL}/chats/all`, {
      headers: {
        Authorization: token,
      },
    });
    const conversations: CompleteConversation[] = response.data.conversations;
    return conversations;
  } catch (error) {
    if (error instanceof AxiosError) {
      if(error.status===404){
        throw new Error("404: Not Found!");
      }
      throw new Error(error.response?.data.message || "Error fetching messages!");
    }
    
    throw new Error("Unexpected Error Occured");
  }
};

export { getConversations };
