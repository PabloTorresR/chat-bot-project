import { DomainEvent } from 'shared-context/domain/DomainEvent';

type CreateUserDomainEventAttributes = {
  readonly name: string;
  readonly email: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'chatapp.user.created';

  readonly name: string;
  readonly email: string;

  constructor({
    aggregateId,
    name,
    email,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    name: string;
    email: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.name = name;
    this.email = email;
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { name, email } = this;
    return {
      name,
      email,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateUserDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      email: attributes.email,
      eventId,
      occurredOn,
    });
  }
}
