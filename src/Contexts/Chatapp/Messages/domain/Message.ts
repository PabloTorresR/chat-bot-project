import { ConversationId } from '../../../../Contexts/Chatapp/Shared/domain/ConversationId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { MessageId } from '../../Shared/domain/MessageId';
import { MessageContent } from './MessageContent';
import { MessageCreatedDomainEvent } from './MessageCreatedDomainEvent';
import { UserId } from '../../../../Contexts/Chatapp/Shared/domain/UserId';
import { MessageCreatedAt } from './MessageCreatedAt';
import { MessageSender } from './MessageSender';
import { MessageSenderValues } from './MessageSenderValues';

export class Message extends AggregateRoot {
  readonly id: MessageId;
  readonly content: MessageContent;
  readonly conversationId: ConversationId;
  readonly userId: UserId;
  readonly createdAt: MessageCreatedAt;
  readonly sender: MessageSender;

  constructor(
    id: MessageId,
    content: MessageContent,
    conversationId: ConversationId,
    userId: UserId,
    createdAt: MessageCreatedAt,
    sender: MessageSender,
  ) {
    super();
    this.id = id;
    this.content = content;
    this.conversationId = conversationId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.sender = sender;
  }

  static create(
    id: MessageId,
    content: MessageContent,
    conversationId: ConversationId,
    userId: UserId,
    createdAt: MessageCreatedAt,
    sender: MessageSender,
  ): Message {
    const message = new Message(id, content, conversationId, userId, createdAt, sender);
    message.record(
      new MessageCreatedDomainEvent({
        aggregateId: message.id.value,
        content: message.content.value,
        conversationId: message.conversationId.value,
        userId: message.userId.value,
        createdAt: message.createdAt.toString(),
        sender: message.sender.value,
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
    sender: string;
  }): Message {
    return new Message(
      new MessageId(plainData.id),
      new MessageContent(plainData.content),
      new ConversationId(plainData.conversationId),
      new UserId(plainData.userId),
      MessageCreatedAt.createFromString(plainData.createdAt),
      new MessageSender(plainData.sender as MessageSenderValues),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      content: this.content.value,
      conversationId: this.conversationId.value,
      userId: this.userId.value,
      createdAt: this.createdAt.toString(),
      sender: this.sender.value,
    };
  }
}
