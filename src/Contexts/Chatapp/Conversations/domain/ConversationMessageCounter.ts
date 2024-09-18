import { NumberValueObject } from 'shared-context/domain/value-object/IntValueObject';

export class ConversationMessageCounter extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static zero(): ConversationMessageCounter {
    return new ConversationMessageCounter(0);
  }
  toPrimitives(): number {
    return this.value;
  }
}
