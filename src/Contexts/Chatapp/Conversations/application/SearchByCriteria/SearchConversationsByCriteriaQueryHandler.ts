import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { Order } from '../../../../Shared/domain/criteria/Order';
import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { ConversationsResponse } from '../ConversationsResponse';
import { ConversationsByCriteriaSearcher } from './ConversationsByCriteriaSearcher';
import { SearchConversationsByCriteriaQuery } from './SearchConversationsByCriteriaQuery';

export class SearchConversationsByCriteriaQueryHandler
  implements QueryHandler<SearchConversationsByCriteriaQuery, ConversationsResponse>
{
  constructor(private conversationsSearcher: ConversationsByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchConversationsByCriteriaQuery;
  }

  handle(query: SearchConversationsByCriteriaQuery): Promise<ConversationsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.conversationsSearcher.run(filters, order, query.limit, query.offset);
  }
}
