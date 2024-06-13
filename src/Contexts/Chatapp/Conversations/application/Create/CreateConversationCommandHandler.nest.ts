import { ConversationCreator } from './ConversationCreator.nest';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { ConversationTitle } from '../../domain/ConversationTitle';
import { CreateConversationCommand } from '../../domain/CreateConversationCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateConversationCommand)
export class CreateConversationCommandHandler implements ICommandHandler<CreateConversationCommand> {
  constructor(private conversationCreator: ConversationCreator) {}

  async execute(command: CreateConversationCommand): Promise<void> {
    const id = new ConversationId(command.id);
    const title = new ConversationTitle(command.title);
    const userId = new ConversationTitle(command.userId);
    await this.conversationCreator.run({ id, title, userId });
  }
}
