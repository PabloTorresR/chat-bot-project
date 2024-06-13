import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'shared-context/domain/criteria/Filters';
import { Order } from 'shared-context/domain/criteria/Order';
import { ConversationsResponse } from '../ConversationsResponse';
import { ConversationsByCriteriaSearcher } from './ConversationsByCriteriaSearcher.nest';
import { SearchConversationsByCriteriaQuery } from './SearchConversationsByCriteriaQuery';

@QueryHandler(SearchConversationsByCriteriaQuery)
export class SearchConversationsByCriteriaQueryHandler
  implements IQueryHandler<SearchConversationsByCriteriaQuery, ConversationsResponse>
{
  constructor(private searcher: ConversationsByCriteriaSearcher) {}


  execute(query: SearchConversationsByCriteriaQuery): Promise<ConversationsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
