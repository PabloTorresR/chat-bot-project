import { CommandHandler } from 'shared-context/domain/CommandHandler';
import { MessageCreator } from './MessageCreator';
import { Command } from 'shared-context/domain/Command';
import { MessageId } from '../../../Shared/domain/MessageId';
import { MessageContent } from '../../domain/MessageContent';
import { CreateMessageCommand } from '../../domain/CreateMessageCommand';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { UserId } from '../../../Shared/domain/UserId';
import { MessageCreatedAt } from '../../domain/MessageCreatedAt';
import { MessageSender } from '../../domain/MessageSender';
import { MessageSenderValues } from '../../domain/MessageSenderValues';

export class CreateMessageCommandHandler implements CommandHandler<CreateMessageCommand> {
  constructor(private messageCreator: MessageCreator) {}

  subscribedTo(): Command {
    return CreateMessageCommand;
  }

  async handle(command: CreateMessageCommand): Promise<void> {
    const id = new MessageId(command.id);
    const conversationId = new ConversationId(command.conversationId);
    const userId = new UserId(command.userId);
    const content = new MessageContent(command.content);
    const createdAt = MessageCreatedAt.createFromString(command.createdAt);
    const sender = new MessageSender(command.sender as MessageSenderValues);
    await this.messageCreator.run({ id, conversationId, userId, content, createdAt, sender });
  }
}
