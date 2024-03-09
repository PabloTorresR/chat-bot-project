import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateMessageDomainEventAttributes = {
  readonly content: string;
  readonly conversationId: string;
  readonly userId: string;
  readonly createdAt: string;
};
export class MessageCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'message.created';

  readonly content: string;
  readonly conversationId: string;
  readonly userId: string;
  readonly createdAt: string;

  constructor({
    aggregateId,
    content,
    conversationId,
    userId,
    createdAt,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    content: string;
    conversationId: string;
    userId: string;
    createdAt: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: MessageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.content = content;
    this.conversationId = conversationId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  toPrimitives(): CreateMessageDomainEventAttributes {
    return {
      content: this.content,
      conversationId: this.conversationId,
      userId: this.userId,
      createdAt: this.createdAt,
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
      eventId,
      occurredOn,
    });
  }
}
