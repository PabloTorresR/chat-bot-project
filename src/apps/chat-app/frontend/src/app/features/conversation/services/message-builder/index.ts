import { MessageSender } from '../../enums/message-sender';
import { HistoryMessage, Message } from '../../types/message';
import { v4 as uuidv4 } from 'uuid';
import { getNowTimestamp } from '../../../../utils/time';
import { PostMessageDto } from '../../types/dto';

class MessageBuilder {
  private _getTimestamp = (): string => {
    return getNowTimestamp();
  };

  private _getConversationHistory = (conversationHistory?: Message[]): HistoryMessage[] => {
    return conversationHistory?.map(({ content, createdAt, sender }) => ({ content, createdAt, sender })) ?? [];
  };

  public buildPostMessageDto = (
    message: string,
    conversationId: string,
    conversationHistory?: Message[],
  ): PostMessageDto => {
    const messageId = uuidv4();
    return {
      message: {
        id: messageId,
        userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
        content: message,
        sender: MessageSender.USER,
        createdAt: this._getTimestamp(),
        conversationId,
      },
      messageHistory: this._getConversationHistory(conversationHistory),
    };
  };
}

export default new MessageBuilder();
