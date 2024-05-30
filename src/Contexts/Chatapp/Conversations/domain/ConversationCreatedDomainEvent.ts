import { DomainEvent } from '../../../Shared/domain/DomainEvent';
export type DomainEventAttributes = { [key: string]: unknown };

export type CreateConversationDomainEventAttributes = {
  readonly title: string;
  readonly userId: string;
};

export class ConversationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'chatapp.conversation.created';

  readonly title: string;
  readonly userId: string;

  constructor({
    aggregateId,
    title,
    userId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    userId: string;
    occurredOn?: Date;
  }) {
    super({ eventName: ConversationCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
    this.userId = userId;
  }

  toPrimitives(): CreateConversationDomainEventAttributes {
    const { title, userId } = this;
    return {
      title,
      userId,
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
      eventId,
      occurredOn,
    });
  }
}
