import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';
import { MessageCreatedAtIncorrectDateString } from './MessageCreatedAtIncorrectDateString';

export class MessageCreatedAt extends DateValueObject {
  static createFromString(dateString: string): MessageCreatedAt {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new MessageCreatedAtIncorrectDateString('Invalid date string');
    }
    return new MessageCreatedAt(date);
  }
  toString(): string {
    console.log(this.value, 'this.value.toISOString()');
    return this.value.toISOString();
  }
}
