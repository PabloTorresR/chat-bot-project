import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { Message } from './Message';

export interface MessageRepository {
  save(message: Message): Promise<void>;
  searchAll(): Promise<Message[]>;
  matching(criteria: Criteria): Promise<Message[]>;
}
