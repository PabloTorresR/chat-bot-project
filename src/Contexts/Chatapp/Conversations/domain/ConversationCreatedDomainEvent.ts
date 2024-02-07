import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateConversationDomainEventAttributes = {
  readonly title: string;
};

export class ConversationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'conversation.created';

  readonly title: string;

  constructor({
    aggregateId,
    title,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    occurredOn?: Date;
  }) {
    super({ eventName: ConversationCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
  }

  toPrimitives(): CreateConversationDomainEventAttributes {
    const { title } = this;
    return {
      title,
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
      eventId,
      occurredOn,
    });
  }
}
