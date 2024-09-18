import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Card } from './Card';

export interface CardRepository {
  save(card: Card): Promise<void>;
  searchAll(): Promise<Card[]>;
  matching(criteria: Criteria): Promise<Card[]>;
}
