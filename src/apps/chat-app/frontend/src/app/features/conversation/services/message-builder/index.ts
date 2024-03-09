import { MessageSender } from '../../enums/message-sender';
import { Message } from '../../types/message';
import { v4 as uuidv4 } from 'uuid';
import { getNowTimestamp } from '../../../../utils/time';
class MessageBuilder {
  private _getTimestamp(): string {
    return getNowTimestamp();
  }

  public buildMessage(message: string, conversationId): Message {
    const messageId = uuidv4();
    return {
      id: messageId,
      content: message,
      sender: MessageSender.USER,
      createdAt: this._getTimestamp(),
      conversationId,
    };
  }
}

export default new MessageBuilder();
