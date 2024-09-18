import { DomainEvent } from 'shared-context/domain/DomainEvent';

export type DomainEventAttributes = { [key: string]: unknown };

export type CreateConversationDomainEventAttributes = {
  readonly title: string;
  readonly userId: string;
  readonly messageCounter: number;
  readonly createdAt: string;
};

export class ConversationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'chatapp.conversation.created';

  readonly title: string;
  readonly userId: string;
  readonly messageCounter: number;
  readonly createdAt: string;

  constructor({
    aggregateId,
    title,
    userId,
    messageCounter,
    createdAt,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    userId: string;
    createdAt: string;
    messageCounter: number;
    occurredOn?: Date;
  }) {
    super({ eventName: ConversationCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
    this.userId = userId;
    this.messageCounter = messageCounter;
    this.createdAt = createdAt;
  }

  toPrimitives(): CreateConversationDomainEventAttributes {
    const { title, userId, messageCounter, createdAt } = this;
    return {
      title,
      userId,
      messageCounter,
      createdAt,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateConversationDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ConversationCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      userId: attributes.userId,
      messageCounter: attributes.messageCounter,
      createdAt: attributes.createdAt,
      eventId,
      occurredOn,
    });
  }
}
