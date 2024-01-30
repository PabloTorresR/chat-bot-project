import { MessageSender } from '../enums/message-sender';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp?: string;
}
