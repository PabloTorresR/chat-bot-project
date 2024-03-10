import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';

export enum MessageSenderValues {
  BOT = 'bot',
  USER = 'user',
}

export class MessageSender extends EnumValueObject<MessageSenderValues> {
  constructor(value: MessageSenderValues) {
    super(value, Object.values(MessageSenderValues));
  }

  protected throwErrorForInvalidValue(value: MessageSenderValues): void {
    throw new Error(`The sender <${value}> is not valid`);
  }
}
