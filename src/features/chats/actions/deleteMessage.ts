"use server";
import { auth } from "@/lib/authOptions";
import { FullMessageType, SocketMessageType } from "../schema";
import axios from "axios";
import { API_URL } from "@/lib/apiEndPoints";
import qs from "query-string";

const deleteMessage = async (data: SocketMessageType | FullMessageType) => {
  try {
    console.log("deleting Message");
    const session = await auth();
    const token = session?.backendToken;

    if("id" in data){
      const queryParams = {
        messageId: data.id
      }
      const url = qs.stringifyUrl({
        url: `${API_URL}/chat/message`,
        query: queryParams,
      });
      
      const response = await axios.delete(url,{
        headers:{
          'Authorization': token,
        }
      });
      console.log(response);
      const message = response.data.message as string;
      return message;
    }
    else{
      throw new Error("Unable to delete Message!");
    }
  } catch{
    throw new Error("Unable to delete Message!");
  }
};

export default deleteMessage;
