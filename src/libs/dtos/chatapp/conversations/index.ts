export type PostConversationsRequest = {
  id: string;
  title: string;
  userId: string;
};

export type PostConversationsResponse = {
  id: string;
  title: string;
  userId: string;
};

export type GetConversationsResponse = {
  id: string;
  title: string;
  userId: string;
}[];
