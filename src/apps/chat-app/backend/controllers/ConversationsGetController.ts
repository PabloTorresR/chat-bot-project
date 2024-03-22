import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { SearchConversationsByCriteriaQuery } from '../../../../Contexts/Chatapp/Conversations/application/SearchByCriteria/SearchConversationsByCriteriaQuery';
import { ConversationsResponse } from '../../../../Contexts/Chatapp/Conversations/application/ConversationsResponse';
import { GetConversationsResponse } from 'libs/dtos/chatapp/conversations';

type FilterType = { value: string; operator: string; field: string };

export class ConversationsGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(_req: Request, res: Response<GetConversationsResponse>) {
    const { query: queryParams } = _req;
    const { filters, orderBy, order, limit, offset } = queryParams;

    const query = new SearchConversationsByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );

    const response = await this.queryBus.ask<ConversationsResponse>(query);
    res.status(httpStatus.OK).send(response.conversations);
  }

  private parseFilters(params: Array<FilterType>): Map<string, string>[] {
    if (!params) {
      return new Array<Map<string, string>>();
    }

    return params.map(filter => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value],
      ]);
    });
  }
}
