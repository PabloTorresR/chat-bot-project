import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { SearchMessagesByCriteriaQuery } from '../../../../Contexts/Chatapp/Messages/application/SearchByCriteria/SearchMessagesByCriteriaQuery';
import { MessagesResponse } from '../../../../Contexts/Chatapp/Messages/application/MessagesResponse';
import { GetMessagesResponse } from 'libs/dtos/chatapp/messages';

type FilterType = { value: string; operator: string; field: string };

export class MessagesGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(_req: Request, res: Response<GetMessagesResponse>) {
    const { query: queryParams } = _req;
    const { filters, orderBy, order, limit, offset } = queryParams;

    const query = new SearchMessagesByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );
    const response = await this.queryBus.ask<MessagesResponse>(query);
    res.status(httpStatus.OK).send(response.messages);
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
