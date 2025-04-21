"use server";
import { API_URL } from "@/lib/apiEndPoints";
import { auth } from "@/lib/authOptions";
import axios, { AxiosError } from "axios";
import { FullFriendRequest } from "../schema";


export const getRequests = async ()=>{
  try {
    const session = await auth();
    if(!session?.backendToken){
      throw Error("User session not found ");
    }

    const token = session.backendToken;

    const response = await axios.get(`${API_URL}/friend/requests`,{
      headers: {
        'Authorization': token,
      }
    });

    return response.data.friendRequests as FullFriendRequest[];
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.message);
    }
    throw new Error("Unexpected Error Ocurred"); 
  }
}