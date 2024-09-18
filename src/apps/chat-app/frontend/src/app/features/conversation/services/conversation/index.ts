import { getNowTimestamp } from '../../../../utils/time';
import { Conversation } from '../../types/conversation';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CONVERSATION_TITLE = 'New Conversation';

class ConversationService {
  private _getTimestamp = (): string => {
    return getNowTimestamp();
  };
  createConversation(userId: string): Conversation {
    return {
      id: uuidv4(),
      title: DEFAULT_CONVERSATION_TITLE,
      userId,
      createdAt: this._getTimestamp(),
    };
  }
}
export default new ConversationService();
