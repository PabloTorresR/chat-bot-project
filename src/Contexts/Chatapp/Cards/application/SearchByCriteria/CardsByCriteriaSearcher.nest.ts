import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { CardRepository } from '../../domain/CardRepository';
import { CardsResponse } from '../CardsResponse';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CardsByCriteriaSearcher {
  constructor(@Inject('CardRepository') private repository: CardRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<CardsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const cards = await this.repository.matching(criteria);

    return new CardsResponse(cards);
  }
}
