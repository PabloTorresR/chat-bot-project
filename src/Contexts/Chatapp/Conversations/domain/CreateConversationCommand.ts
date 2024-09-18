import { Command } from 'shared-context/domain/Command';

type Params = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export class CreateConversationCommand extends Command {
  id: string;
  title: string;
  userId: string;
  createdAt: string;

  constructor({ id, title, userId, createdAt }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
