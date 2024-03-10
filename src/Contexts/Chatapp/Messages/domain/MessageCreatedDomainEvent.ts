import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateMessageDomainEventAttributes = {
  readonly content: string;
  readonly conversationId: string;
  readonly userId: string;
  readonly createdAt: string;
  readonly sender: string;
};
export class MessageCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'message.created';

  readonly content: string;
  readonly conversationId: string;
  readonly userId: string;
  readonly createdAt: string;
  readonly sender: string;

  constructor({
    aggregateId,
    content,
    conversationId,
    userId,
    createdAt,
    eventId,
    occurredOn,
    sender,
  }: {
    aggregateId: string;
    content: string;
    conversationId: string;
    userId: string;
    createdAt: string;
    sender: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: MessageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.content = content;
    this.conversationId = conversationId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.sender = sender;
  }

  toPrimitives(): CreateMessageDomainEventAttributes {
    return {
      content: this.content,
      conversationId: this.conversationId,
      userId: this.userId,
      createdAt: this.createdAt,
      sender: this.sender,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateMessageDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MessageCreatedDomainEvent({
      aggregateId,
      content: attributes.content,
      conversationId: attributes.conversationId,
      userId: attributes.userId,
      createdAt: attributes.createdAt,
      sender: attributes.sender,
      eventId,
      occurredOn,
    });
  }
}
