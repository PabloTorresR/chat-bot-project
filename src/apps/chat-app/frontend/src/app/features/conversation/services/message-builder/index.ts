import { MessageSender } from '../../enums/message-sender';
import { HistoryMessage, Message } from '../../types/message';
import { v4 as uuidv4 } from 'uuid';
import { getNowTimestamp } from '../../../../utils/time';
import { PostMessagesRequest } from 'libs/dtos/chatapp/messages';

class MessageBuilder {
  private _getTimestamp = (): string => {
    return getNowTimestamp();
  };

  private _getConversationHistory = (conversationHistory?: Message[]): HistoryMessage[] => {
    return (
      conversationHistory?.map(({ content, createdAt, sender }) => ({ content, createdAt, sender })) ?? []
    ).reverse();
  };

  public buildPostMessageDto = (
    message: string,
    conversationId: string,
    userId: string,
    conversationHistory?: Message[],
  ): PostMessagesRequest => {
    const messageId = uuidv4();
    return {
      message: {
        id: messageId,
        userId,
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
