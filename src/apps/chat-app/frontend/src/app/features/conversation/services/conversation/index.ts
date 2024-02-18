import { postConversations } from '../../api/conversations';
import { Conversation } from '../../types/conversation';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CONVERSATION_TITLE = 'New Conversation';

class ConversationService {
  public buildConversation(): Conversation {
    const newConversation = this.createConversation();
    try {
      this.sendConversation(newConversation);
    } catch (error) {
      console.error('Error sending conversation', error);
    }
    return newConversation;
  }

  private createConversation(): Conversation {
    return {
      id: uuidv4(),
      title: DEFAULT_CONVERSATION_TITLE,
    };
  }

  private async sendConversation(conversation: Conversation): Promise<void> {
    await postConversations(conversation);
  }
}
export default new ConversationService();
