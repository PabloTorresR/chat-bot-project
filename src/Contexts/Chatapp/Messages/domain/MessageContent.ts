import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { MessageContentLengthExceeded } from './MessageContentLengthExceeded';

export class MessageContent extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan300Characters(value);
  }

  private ensureLengthIsLessThan300Characters(value: string): void {
    if (value.length > 300) {
      throw new MessageContentLengthExceeded(`The Message content <${value}> has more than 300 characters`);
    }
  }
}
