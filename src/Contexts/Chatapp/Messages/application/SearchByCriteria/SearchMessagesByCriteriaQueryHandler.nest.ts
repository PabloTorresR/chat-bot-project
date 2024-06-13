import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessagesResponse } from '../MessagesResponse';
import { MessagesByCriteriaSearcher } from './MessagesByCriteriaSearcher.nest';
import { SearchMessagesByCriteriaQuery } from './SearchMessagesByCriteriaQuery';

@QueryHandler(SearchMessagesByCriteriaQuery)
export class SearchMessagesByCriteriaQueryHandler
  implements IQueryHandler<SearchMessagesByCriteriaQuery, MessagesResponse>
{
  constructor(private searcher: MessagesByCriteriaSearcher) {}

  execute(query: SearchMessagesByCriteriaQuery): Promise<MessagesResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
