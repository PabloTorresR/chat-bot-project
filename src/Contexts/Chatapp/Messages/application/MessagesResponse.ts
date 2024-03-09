import { Message } from '../domain/Message';

interface MessageResponse {
  id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
}

export class MessagesResponse {
  public readonly messages: MessageResponse[];

  constructor(messages: Message[]) {
    this.messages = messages.map(message => message.toPrimitives());
  }
}
