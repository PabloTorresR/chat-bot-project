import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { Query } from 'shared-context/domain/Query';
import { QueryHandler } from 'shared-context/domain/QueryHandler';
import { ConversationsResponse } from '../ConversationsResponse';
import { ConversationsByCriteriaSearcher } from './ConversationsByCriteriaSearcher';
import { SearchConversationsByCriteriaQuery } from './SearchConversationsByCriteriaQuery';

export class SearchConversationsByCriteriaQueryHandler
  implements QueryHandler<SearchConversationsByCriteriaQuery, ConversationsResponse>
{
  constructor(private searcher: ConversationsByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchConversationsByCriteriaQuery;
  }

  handle(query: SearchConversationsByCriteriaQuery): Promise<ConversationsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
