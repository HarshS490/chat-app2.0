import { z } from "zod";

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

// BaseUser schema and type (adjust fields as needed)
export const BaseUserSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  color: z.string().nullable(),
});

// BaseMessage schema and type
export const BaseMessageSchema = z.object({
  id: z.string(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  body: z.string().nullable(),
  public_id: z.string().nullable(),
  isEdited: z.boolean().nullable(),
});

export type BaseMessage = z.infer<typeof BaseMessageSchema>;

export const FullMessageSchema = BaseMessageSchema.extend({
  createdBy: BaseUserSchema,
});

export type FullMessageType = z.infer<typeof FullMessageSchema>;

export const SocketMessageSchema = FullMessageSchema.omit({ id: true }).extend({
  chatId: z.string(),
});
export type SocketMessageType = z.infer<typeof SocketMessageSchema>;
