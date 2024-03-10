import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { Order } from '../../../../Shared/domain/criteria/Order';
import { MessageRepository } from '../../domain/MessageRepository';
import { MessagesResponse } from '../MessagesResponse';

export class MessagesByCriteriaSearcher {
  constructor(private repository: MessageRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<MessagesResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const messages = await this.repository.matching(criteria);

    return new MessagesResponse(messages);
  }
}
