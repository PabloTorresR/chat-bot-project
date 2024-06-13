import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { MessageRepository } from '../../domain/MessageRepository';
import { MessagesResponse } from '../MessagesResponse';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MessagesByCriteriaSearcher {
  constructor(@Inject("MessageRepository") private repository: MessageRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<MessagesResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const messages = await this.repository.matching(criteria);

    return new MessagesResponse(messages);
  }
}
