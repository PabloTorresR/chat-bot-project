import { ConversationId } from '../../../../../Contexts/Chatapp/Shared/domain/ConversationId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { MessageId } from '../../../Shared/domain/MessageId';
import { Message } from '../../domain/Message';
import { MessageContent } from '../../domain/MessageContent';
import { MessageRepository } from '../../domain/MessageRepository';
import { UserId } from '../../../../../Contexts/Chatapp/Shared/domain/UserId';
import { MessageCreatedAt } from '../../domain/MessageCreatedAt';

export class MessageCreator {
  constructor(private repository: MessageRepository, private eventBus: EventBus) {}

  async run(params: {
    id: MessageId;
    content: MessageContent;
    conversationId: ConversationId;
    userId: UserId;
    createdAt: MessageCreatedAt;
  }): Promise<void> {
    const message = Message.create(params.id, params.content, params.conversationId, params.userId, params.createdAt);
    await this.repository.save(message);
    await this.eventBus.publish(message.pullDomainEvents());
  }
}
