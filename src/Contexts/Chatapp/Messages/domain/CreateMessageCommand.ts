import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
  sender: string;
};

export class CreateMessageCommand extends Command {
  id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
  sender: string;

  constructor({ id, content, conversationId, userId, createdAt, sender }: Params) {
    super();
    this.id = id;
    this.content = content;
    this.conversationId = conversationId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.sender = sender;
  }
}
