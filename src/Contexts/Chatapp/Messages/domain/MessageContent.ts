import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { MessageContentLengthExceeded } from './MessageContentLengthExceeded';

export class MessageContent extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan3000Characters(value);
  }

  private ensureLengthIsLessThan3000Characters(value: string): void {
    if (value.length > 3000) {
      throw new MessageContentLengthExceeded(`The Message content <${value}> has more than 3000 characters`);
    }
  }
}
