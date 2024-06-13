import { Inject, Injectable } from '@nestjs/common';
import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { ConversationsResponse } from '../ConversationsResponse';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class ConversationsByCriteriaSearcher {
  constructor(@Inject("ConversationRepository") private repository: ConversationRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<ConversationsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const conversations = await this.repository.matching(criteria);

    return new ConversationsResponse(conversations);
  }
}
