import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateConversationCommand } from '../../domain/CreateConversationCommand';
import { ConversationId } from '../../../Shared/domain/ConversationId';

import { Inject } from '@nestjs/common';
import { ConversationsDeletor } from '../Delete/ConversationsDeletor';
import { DeleteConversationCommand } from '../../domain/DeleteConversationCommand';

@CommandHandler(DeleteConversationCommand)
export class DeleteConversationCommandHandler implements ICommandHandler<DeleteConversationCommand> {
  constructor(@Inject('ConversationsDeletor') private conversationsDeletor: ConversationsDeletor) {}
  async execute(command: CreateConversationCommand): Promise<void> {
    const id = new ConversationId(command.id);
    await this.conversationsDeletor.run({ id });
  }
}
