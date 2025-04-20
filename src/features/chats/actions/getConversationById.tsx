import { API_URL } from "@/lib/apiEndPoints";
import { auth } from "@/lib/authOptions";
import axios from "axios";
import { PartialConversation } from "../schema";

const getConversationById = async (chatId: string) => {
  try {
    const session = await auth();

    const token = session?.backendToken;
    const response = await axios.post(
      `${API_URL}/chat/id`,
      { chatId },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const conversation: PartialConversation | null = response.data.conversation;
    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getConversationById };
