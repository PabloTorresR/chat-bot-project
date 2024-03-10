import { MessageSender } from '../enums/message-sender';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  createdAt: string;
  conversationId: string;
  userId: string;
}

export interface HistoryMessage extends Omit<Message, 'userId' | 'conversationId' | 'id'> {}
