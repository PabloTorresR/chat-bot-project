import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateConversationCommand } from 'chatapp-context/Conversations/domain/CreateConversationCommand';
import { SearchConversationsByCriteriaQuery } from 'chatapp-context/Conversations/application/SearchByCriteria/SearchConversationsByCriteriaQuery';
import { Injectable } from '@nestjs/common';
import { QueryParams } from 'dtos-lib/chatapp/filters';
import { parseFilters } from './utils/parse-filters';
import {
  GetConversationsResponse,
  PostConversationsRequest,
  PostConversationsResponse,
} from 'dtos-lib/chatapp/conversations';
import { ConversationsResponse } from 'chatapp-context/Conversations/application/ConversationsResponse';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll({ filters, orderBy, orderType, limit, offset }: QueryParams): Promise<GetConversationsResponse> {
    const query = new SearchConversationsByCriteriaQuery(
      parseFilters(filters),
      orderBy,
      orderType,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );

    const conversationsResponse = await this.queryBus.execute<
      SearchConversationsByCriteriaQuery,
      ConversationsResponse
    >(query);
    return conversationsResponse.conversations;
  }

  async create(body: PostConversationsRequest) {
    const createConversationCommand = new CreateConversationCommand({
      id: body.id,
      title: body.title,
      userId: body.userId,
    });
    return await this.commandBus.execute<CreateConversationCommand, PostConversationsResponse>(
      createConversationCommand,
    );
  }
}
