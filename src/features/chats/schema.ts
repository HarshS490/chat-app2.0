import { BaseUser } from "../users/schema";

export type CompleteConversation = {
  userId: string;
  conversationId: string;
  conversation: {
    id: string;
    name: string | null;
    image: string | null;
    isGroup: boolean;
    createdAt: Date;
    lastMessageAt: Date;
    users: Array<{
      user: {
        id: string;
        email: string;
        name: string;
        image: string;
      };
      userId: string;
      conversationId: string;
    }>;
    messages: Array<{
      id: string;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      conversationId: string;
      body: string | null;
      public_id: string | null;
      isEdited: boolean | null;
      createdBy: {
        name: string | null;
      };
    }>;
  };
};

export type PartialConversation = {
  id: string;
  name: string | null;
  image: string | null;
  isGroup: boolean;
  createdAt: Date;
  lastMessageAt: Date;
  users: Array<{
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
    userId: string;
    conversationId: string;
  }>;
};

export type Conversation = {
  isGroup: boolean | null;
  name: string | null;
  id: string;
  image: string | null;
  createdAt: Date;
  lastMessageAt: Date;
};

export type messages = {
  messages: Array<{
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    conversationId: string;
    body: string | null;
    public_id: string | null;
    isEdited: boolean | null;
    createdBy: {
      name: string | null;
    };
  }>;
};

export type BaseMessage = {
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  conversationId: string;
  body: string | null;
  public_id: string | null;
  isEdited: boolean | null;
};

export type FullMessageType = {createdBy:BaseUser} & BaseMessage;


export type SocketMessageType = {
  body:string;
  image:string|null;
  chatId: string;
  createdBy: string;
  name: string;
  createdAt : Date;
  timeStamp?: number;
}