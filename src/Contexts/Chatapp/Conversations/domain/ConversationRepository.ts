import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Conversation } from './Conversation';
import { ConversationId } from '../../Shared/domain/ConversationId';

export interface ConversationRepository {
  save(conversation: Conversation): Promise<void>;
  searchAll(): Promise<Conversation[]>;
  matching(criteria: Criteria): Promise<Conversation[]>;
  updateTitle(id: string, title: string): Promise<void>;
  deleteById(id: ConversationId): Promise<void>;
}
