import { ConversationId } from '../../../../Contexts/Chatapp/Shared/domain/ConversationId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { MessageId } from '../../Shared/domain/MessageId';
import { MessageContent } from './MessageContent';
import { MessageCreatedDomainEvent } from './MessageCreatedDomainEvent';
import { UserId } from '../../../../Contexts/Chatapp/Shared/domain/UserId';
import { MessageCreatedAt } from './MessageCreatedAt';

export class Message extends AggregateRoot {
  readonly id: MessageId;
  readonly content: MessageContent;
  readonly conversationId: ConversationId;
  readonly userId: UserId;
  readonly createdAt: MessageCreatedAt;

  constructor(
    id: MessageId,
    content: MessageContent,
    conversationId: ConversationId,
    userId: UserId,
    createdAt: MessageCreatedAt,
  ) {
    console.log('Message', id, content, conversationId, userId, createdAt);
    super();
    this.id = id;
    this.content = content;
    this.conversationId = conversationId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static create(
    id: MessageId,
    content: MessageContent,
    conversationId: ConversationId,
    userId: UserId,
    createdAt: MessageCreatedAt,
  ): Message {
    const message = new Message(id, content, conversationId, userId, createdAt);

    message.record(
      new MessageCreatedDomainEvent({
        aggregateId: message.id.value,
        content: message.content.value,
        conversationId: message.conversationId.value,
        userId: message.userId.value,
        createdAt: message.createdAt.toString(),
      }),
    );

    return message;
  }

  static fromPrimitives(plainData: {
    id: string;
    content: string;
    conversationId: string;
    userId: string;
    createdAt: string;
  }): Message {
    return new Message(
      new MessageId(plainData.id),
      new MessageContent(plainData.content),
      new ConversationId(plainData.conversationId),
      new UserId(plainData.userId),
      MessageCreatedAt.createFromString(plainData.createdAt),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      content: this.content.value,
      conversationId: this.conversationId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }
}
