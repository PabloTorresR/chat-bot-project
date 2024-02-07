import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateMessageDomainEventAttributes = {
  readonly content: string;
};

export class MessageCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'message.created';

  readonly content: string;

  constructor({
    aggregateId,
    content,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    content: string;
    occurredOn?: Date;
  }) {
    super({ eventName: MessageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.content = content;
  }

  toPrimitives(): CreateMessageDomainEventAttributes {
    const { content } = this;
    return {
      content,
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
      eventId,
      occurredOn,
    });
  }
}
