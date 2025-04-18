"use server";
import { API_URL } from "@/lib/apiEndPoints";
import { auth } from "@/lib/authOptions";
import axios from "axios";
import { FullFriendRequest } from "../schema";



async function acceptFriendRequest() {
  try {
    const session =await auth();
    if(!session?.backendToken){
      throw new Error("User session is not found");
    }

    const response = await axios.post(`${API_URL}/friend/accept`,{
      headers:{
        'Authorization':session.backendToken,
      }
    });

    return response.data.message as FullFriendRequest;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default acceptFriendRequest;