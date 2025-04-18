"use server";
import { API_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";
import { PartialUser } from "../schema";
import qs from "query-string";
import { auth } from "@/lib/authOptions";

const PAGE_SIZE = 30;

const getUsers = async ({ pageParam , query}: { pageParam: number , query: string}) => {
  try {
    const session = await auth();
    
    if(!session || !session?.backendToken){
      throw new Error("Session Not Found!")
    }
    const queryParams = {
      query ,
      pageNumber:pageParam,
    }
    const url = qs.stringifyUrl({
      url:`${API_URL}/users/all`,
      query:queryParams,
    })
    const response = await axios.get(url,{
      headers:{
        'Authorization':session.backendToken,
      }
    });
    const users: PartialUser[] = response.data.users;
    console.log(url);
    return {
      users: users as PartialUser[],
      currentPage: pageParam,
      nextPage: PAGE_SIZE > response.data.users.length ? null : pageParam + 1,
    };

    

  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.message);
    }
    if(error instanceof Error){
      throw new Error(error.message);
    }
    return {
      users: [],
      currentPage:pageParam,
      nextPage: pageParam,
    };
  }
};

export { getUsers };
