import { DeleteConversationCommand } from 'chatapp-context/Conversations/domain/DeleteConversationCommand';
import { UpdateConversationTitleCommand } from 'chatapp-context/Conversations/domain/UpdateConversationTitleCommand';
import { IncrementConversationMessagesCountCommand } from 'chatapp-context/Conversations/domain/IncrementConversationMessagesCounterCommand';
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
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly messageService: MessagesService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAll({ filters, orderBy, orderType, limit, offset }: QueryParams): Promise<GetConversationsResponse> {
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
      createdAt: body.createdAt,
    });
    return await this.commandBus.execute<CreateConversationCommand, PostConversationsResponse>(
      createConversationCommand,
    );
  }

  async updateTitle(id: string, title: string) {
    const updateConversationCommand = new UpdateConversationTitleCommand({
      id,
      title,
    });
    return await this.commandBus.execute<UpdateConversationTitleCommand, void>(updateConversationCommand);
  }

  async incrementMessagesCount(id: string) {
    const incrementConversationMessagesCountCommand = new IncrementConversationMessagesCountCommand({
      id,
    });
    return await this.commandBus.execute<IncrementConversationMessagesCountCommand, void>(
      incrementConversationMessagesCountCommand,
    );
  }

  async delete(id: string) {
    await this.messageService.deleteAllByConversationId(id);
    const deleteConversationCommand = new DeleteConversationCommand({
      id,
    });
    return await this.commandBus.execute<DeleteConversationCommand, void>(deleteConversationCommand);
  }
}
