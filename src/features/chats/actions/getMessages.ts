"use server";
import { API_URL } from "@/lib/apiEndPoints";
import { auth } from "@/lib/authOptions";
import axios, { AxiosError } from "axios";
import { FullMessageType } from "../schema";
import qs from "query-string";

const PAGE_SIZE = 30;

export const fetchMessages = async ({
  pageParam,
  chatId,
}: {
  pageParam: string;
  chatId: string;
}) => {
  try {
    const session = await auth();
    const token = session?.backendToken;
    const queryParams = {
      pageParam,
      chatId
    }
    const url = qs.stringifyUrl({
      url: `${API_URL}/chat/messages`,
      query:queryParams,
    })

    const response =await axios.get(url,{
      headers:{
        "Authorization":token,
      }
    });
    const messages = response.data.messages as FullMessageType[];
    if(messages.length==0){
      return {
        messages:messages,
        currentPage: pageParam,
        nextPage: null,
      }
    }
    const cursor = messages[0].id;
    return {
      messages:messages,
      currentPage: cursor,
      nextPage: PAGE_SIZE>messages.length ? null: cursor,
    }
  } catch (error) {
    console.log(error);
    if(error instanceof AxiosError){
      throw new Error(error.message);
    }
    return {
      messages: [],
      currentPage:pageParam,
      nextPage: pageParam,
    };
  }
};
