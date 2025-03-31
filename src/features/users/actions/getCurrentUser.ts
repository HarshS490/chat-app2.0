import { auth } from "@/lib/authOptions";
import { SessionUser } from "../schema";


export const getCurrentUser = async ()=>{
  try {
    const session = await auth();
    if(!session){
      return null;
    }
    const {user} = session;
    return user as SessionUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}