import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { MessageCreator } from './MessageCreator';
import { Command } from '../../../../Shared/domain/Command';
import { MessageId } from '../../../Shared/domain/MessageId';
import { MessageContent } from '../../domain/MessageContent';
import { CreateMessageCommand } from '../../domain/CreateMessageCommand';
import { ConversationId } from '../../../../../Contexts/Chatapp/Shared/domain/ConversationId';
import { UserId } from '../../../../../Contexts/Chatapp/Shared/domain/UserId';
import { MessageCreatedAt } from '../../domain/MessageCreatedAt';
import { MessageSender, MessageSenderValues } from '../../domain/MessageSender';

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
