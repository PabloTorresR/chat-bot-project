import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { Order } from '../../../../Shared/domain/criteria/Order';
import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
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
