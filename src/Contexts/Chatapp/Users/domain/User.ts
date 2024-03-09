import { UserId } from 'Contexts/Chatapp/Shared/domain/UserId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: string;
  readonly email: string;

  constructor(id: UserId, name: string, email: string) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;

    this.record(
      new UserCreatedDomainEvent({
        aggregateId: this.id.value,
        name: this.name,
        email: this.email,
      }),
    );
  }

  static create(id: UserId, name: string, email: string): User {
    return new User(id, name, email);
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string }): User {
    return new User(new UserId(plainData.id), plainData.name, plainData.email);
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name,
      email: this.email,
    };
  }
}
