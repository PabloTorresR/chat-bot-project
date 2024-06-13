import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { Query } from 'shared-context/domain/Query';
import { QueryHandler } from 'shared-context/domain/QueryHandler';
import { MessagesResponse } from '../MessagesResponse';
import { MessagesByCriteriaSearcher } from './MessagesByCriteriaSearcher';
import { SearchMessagesByCriteriaQuery } from './SearchMessagesByCriteriaQuery';

export class SearchMessagesByCriteriaQueryHandler
  implements QueryHandler<SearchMessagesByCriteriaQuery, MessagesResponse>
{
  constructor(private searcher: MessagesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchMessagesByCriteriaQuery;
  }

  handle(query: SearchMessagesByCriteriaQuery): Promise<MessagesResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
