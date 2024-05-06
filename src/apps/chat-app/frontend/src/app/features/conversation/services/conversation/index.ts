import { postConversations } from '../../api/conversations';
import { Conversation } from '../../types/conversation';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CONVERSATION_TITLE = 'New Conversation';

class ConversationService {
  async postConversation(conversation: Conversation, callback: () => void) {
    try {
      await postConversations(conversation);
      callback();
    } catch (error) {
      console.error('Error sending conversation', error);
    }
  }

  createConversation(userId: string): Conversation {
    return {
      id: uuidv4(),
      title: DEFAULT_CONVERSATION_TITLE,
      userId,
    };
  }
}
export default new ConversationService();
