import { HistoryMessage, Message } from './message';

export interface PostMessageDto {
  message: Message;
  messageHistory: HistoryMessage[];
}
