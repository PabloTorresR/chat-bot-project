import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CardsResponse } from '../CardsResponse';
import { CardsByCriteriaSearcher } from './CardsByCriteriaSearcher.nest';
import { SearchCardsByCriteriaQuery } from './SearchCardsByCriteriaQuery';

@QueryHandler(SearchCardsByCriteriaQuery)
export class SearchCardsByCriteriaQueryHandler implements IQueryHandler<SearchCardsByCriteriaQuery, CardsResponse> {
  constructor(private searcher: CardsByCriteriaSearcher) {}

  execute(query: SearchCardsByCriteriaQuery): Promise<CardsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
