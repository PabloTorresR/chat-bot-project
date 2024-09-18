import { DateValueObject } from 'shared-context/domain/value-object/DateValueObject';
import { InvalidArgumentError } from 'shared-context/domain/value-object/InvalidArgumentError';

export class ConversationCreatedAt extends DateValueObject {
  static createFromString(dateString: string): ConversationCreatedAt {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new InvalidArgumentError('Invalid date string');
    }
    return new ConversationCreatedAt(date);
  }
  toString(): string {
    return this.value.toISOString();
  }
}
