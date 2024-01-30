import { MessageSender } from '../../enums/message-sender';
import { Message } from '../../types/message';
import { v4 as uuidv4 } from 'uuid';

export class MessageBuilder {
  private _getTimestamp(): string {
    return new Date().toISOString();
  }

  public buildMessage(message: string): Message {
    const messageId = uuidv4();
    return {
      id: messageId,
      content: message,
      sender: MessageSender.USER,
      timestamp: this._getTimestamp(),
    };
  }
}
