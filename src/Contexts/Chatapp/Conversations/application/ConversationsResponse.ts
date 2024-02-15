import { Conversation } from '../domain/Conversation';

interface ConversationResponse {
  id: string;
  title: string;
}

export class ConversationsResponse {
  public readonly conversations: ConversationResponse[];

  constructor(conversations: Conversation[]) {
    this.conversations = conversations.map(conversation => conversation.toPrimitives());
  }
}
