export type PartialUser = {
  name: string | null;
  id: string;
  image: string | null;
  createdAt: Date;
};

export type SessionUser = {
  name: string;
  email: string;
  image: string;
  id: string;
};

export type BaseUser = {
  name: string | null;
  id: string;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BaseFriendRequest = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  receiverId: string;
  status: "accepted" | "declined" | "pending";
};

export type FullFriendRequest = { sender: BaseUser } & {
  receiver: BaseUser;
} & BaseFriendRequest;
