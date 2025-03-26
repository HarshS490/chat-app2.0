export type PartialUser={
  name: string | null;
  id: string;
  image: string | null;
  createdAt: Date;
};

export type SessionUser ={
  name: string,
  email: string,
  image: string,
  id: string
}