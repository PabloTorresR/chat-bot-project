import { MessageSender } from '../enums/message-sender';
import { LlmVocabulary } from '../../cards/types/vocabulary';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  createdAt: string;
  conversationId: string;
  userId: string;
  vocabulary?: LlmVocabulary;
}

export interface HistoryMessage extends Omit<Message, 'userId' | 'conversationId' | 'id'> {}
