export type PostConversationsRequest = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type PostConversationsResponse = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type GetConversationsResponse = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
}[];
