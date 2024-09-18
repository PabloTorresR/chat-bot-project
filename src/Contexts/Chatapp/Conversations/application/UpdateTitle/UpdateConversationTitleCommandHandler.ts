import { ConversationId } from '../../../Shared/domain/ConversationId';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateConversationTitleCommand } from '../../domain/UpdateConversationTitleCommand';
import { ConversationTitleUpdater } from './ConversationTitleUpdater';

@CommandHandler(UpdateConversationTitleCommand)
export class UpdateConversationTitleCommandHandler implements ICommandHandler<UpdateConversationTitleCommand> {
  constructor(private conversationTitleUpdater: ConversationTitleUpdater) {}

  async execute(command: UpdateConversationTitleCommand): Promise<void> {
    const id = new ConversationId(command.id);
    await this.conversationTitleUpdater.run({ id });
  }
}
