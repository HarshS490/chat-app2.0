import { API_URL } from "@/lib/apiEndPoints";
import axios from "axios"
import { PartialUser } from "../schema";



const getUsers = async ()=>{
  try {
    const response = await axios.get(`${API_URL}/users/all`);
    const users:PartialUser[] = response.data.users;
    return users;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export {getUsers};