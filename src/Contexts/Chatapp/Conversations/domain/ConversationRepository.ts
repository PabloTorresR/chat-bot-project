import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Conversation } from './Conversation';

export interface ConversationRepository {
  save(conversation: Conversation): Promise<void>;
  searchAll(): Promise<Conversation[]>;
  matching(criteria: Criteria): Promise<Conversation[]>;
}
