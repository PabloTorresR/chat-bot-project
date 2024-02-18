import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { ConversationCreator } from './ConversationCreator';
import { Command } from '../../../../Shared/domain/Command';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { ConversationTitle } from '../../domain/ConversationTitle';
import { CreateConversationCommand } from '../../domain/CreateConversationCommand';

export class CreateConversationCommandHandler implements CommandHandler<CreateConversationCommand> {
  constructor(private conversationCreator: ConversationCreator) {}

  subscribedTo(): Command {
    return CreateConversationCommand;
  }

  async handle(command: CreateConversationCommand): Promise<void> {
    const id = new ConversationId(command.id);
    const title = new ConversationTitle(command.title);
    await this.conversationCreator.run({ id, title });
  }
}
