import { Command } from 'shared-context/domain/Command';

type Params = {
  conversationId: string;
};

export class DeleteAllMessagesByConversationIdCommand extends Command {
  conversationId: string;

  constructor({ conversationId }: Params) {
    super();
    this.conversationId = conversationId;
  }
}
