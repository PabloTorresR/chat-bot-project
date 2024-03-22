import { Request } from 'express';

export type PostMessagesRequest = Request & {
  body: {
    message: Message;
    messageHistory: HistoryMessage[];
  };
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
