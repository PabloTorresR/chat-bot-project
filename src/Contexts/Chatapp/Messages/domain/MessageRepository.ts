import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Message } from './Message';
import { ConversationId } from '../../Shared/domain/ConversationId';

export interface MessageRepository {
  save(message: Message): Promise<void>;
  searchAll(): Promise<Message[]>;
  matching(criteria: Criteria): Promise<Message[]>;
  deleteByConversationId(conversationId: ConversationId): Promise<void>;
}
