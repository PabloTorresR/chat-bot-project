import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';
import { MessageSenderValues } from './MessageSenderValues';

export class MessageSender extends EnumValueObject<MessageSenderValues> {
  constructor(value: MessageSenderValues) {
    super(value, Object.values(MessageSenderValues));
  }

  protected throwErrorForInvalidValue(value: MessageSenderValues): void {
    throw new Error(`The sender <${value}> is not valid`);
  }
}
