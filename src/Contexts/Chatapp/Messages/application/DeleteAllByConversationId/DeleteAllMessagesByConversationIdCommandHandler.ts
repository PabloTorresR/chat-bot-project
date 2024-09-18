import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageCommand } from '../../domain/CreateMessageCommand';
import { ConversationId } from '../../../Shared/domain/ConversationId';

import { Inject } from '@nestjs/common';
import { DeleteAllMessagesByConversationIdCommand } from '../../domain/DeleteAllMessagesByConversationIdCommand';
import { MessagesDeletor } from '../Delete/MessagesDeletor';

@CommandHandler(DeleteAllMessagesByConversationIdCommand)
export class DeleteAllMessagesByConversationIdCommandHandler
  implements ICommandHandler<DeleteAllMessagesByConversationIdCommand>
{
  constructor(@Inject('MessagesDeletor') private messagesDeletor: MessagesDeletor) {}
  async execute(command: CreateMessageCommand): Promise<void> {
    const conversationId = new ConversationId(command.conversationId);
    await this.messagesDeletor.run({ conversationId });
  }
}
