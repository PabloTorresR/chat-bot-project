export type PostMessagesRequest = {
  message: Message;
  messageHistory: HistoryMessage[];
  userLanguage: string;
};

export interface PostMessagesResponse extends Message {}

export type GetMessagesResponse = Message[];

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  conversationId: string;
  userId: string;
}

interface HistoryMessage extends Omit<Message, 'userId' | 'conversationId' | 'id'> {}
