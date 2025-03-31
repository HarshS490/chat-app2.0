export type PartialConversation = {
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
