import { ConversationId } from '../../../Shared/domain/ConversationId';
import { MessageId } from '../../../Shared/domain/MessageId';
import { Message } from '../../domain/Message';
import { MessageContent } from '../../domain/MessageContent';
import { MessageRepository } from '../../domain/MessageRepository';
import { UserId } from '../../../Shared/domain/UserId';
import { MessageCreatedAt } from '../../domain/MessageCreatedAt';
import { MessageSender } from '../../domain/MessageSender';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class MessageCreator {
  constructor(@Inject("MessageRepository") private repository: MessageRepository, private eventBus: EventBus) {}

  async run(params: {
    id: MessageId;
    content: MessageContent;
    conversationId: ConversationId;
    userId: UserId;
    createdAt: MessageCreatedAt;
    sender: MessageSender;
  }): Promise<void> {
    const message = Message.create(
      params.id,
      params.content,
      params.conversationId,
      params.userId,
      params.createdAt,
      params.sender,
    );
    await this.repository.save(message);
    await this.eventBus.publish(message.pullDomainEvents());
  }
}
