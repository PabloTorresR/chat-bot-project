import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { ConversationTitleLengthExceeded } from './ConversationTitleLengthExceeded';

export class ConversationTitle extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 300) {
      throw new ConversationTitleLengthExceeded(`The Message content <${value}> has more than 300 characters`);
    }
  }
}
