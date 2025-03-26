import { auth } from "@/lib/authOptions";
import { SessionUser } from "../schema";


export const getCurrentUser = async ()=>{
  try {
    const {user} = await auth();
    console.log("current user : ",user);
    return user as SessionUser;
  } catch (error) {
    return null;
    console.log(error);
  }
}