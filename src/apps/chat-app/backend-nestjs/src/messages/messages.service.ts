import { CreateMessageCommand } from 'chatapp-context/Messages/domain/CreateMessageCommand';
import { MessageAnswerGenerator } from 'chatapp-context/Messages/domain/MessageAnswerGenerator';
import { SearchMessagesByCriteriaQuery } from 'chatapp-context/Messages/application/SearchByCriteria/SearchMessagesByCriteriaQuery';
import { MessagesResponse } from 'chatapp-context/Messages/application/MessagesResponse';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { QueryParams } from 'dtos-lib/chatapp/filters';
import { GetMessagesResponse, PostMessagesRequest } from 'dtos-lib/chatapp/messages';
import { parseFilters } from './parse-filters';
import { v4 as uuidv4 } from 'uuid';
import { MessageSenderValues } from 'chatapp-context/Messages/domain/MessageSenderValues';

@Injectable()
export class MessagesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('MessageAnswerGenerator')
    private readonly messageAnswerGenerator: MessageAnswerGenerator,
  ) {}

  async newUserMessage(body: PostMessagesRequest) {
    const chatbotMessageString = await this.messageAnswerGenerator.generate(body);
    const [, chatbotMessage] = await Promise.all([
      this.createUserMessage(body.message),
      this.createBotMessage(body.message, chatbotMessageString),
    ]);
    return chatbotMessage;
  }

  async findAll({ filters, orderBy, orderType, limit, offset }: QueryParams): Promise<GetMessagesResponse> {
    const query = new SearchMessagesByCriteriaQuery(
      parseFilters(filters),
      orderBy,
      orderType,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );

    const messagesResponse = await this.queryBus.execute<SearchMessagesByCriteriaQuery, MessagesResponse>(query);
    return messagesResponse.messages;
  }
  private async createBotMessage(userMessage: PostMessagesRequest['message'], content: string) {
    const createMessageCommand = new CreateMessageCommand({
      id: uuidv4(),
      content: content,
      conversationId: userMessage.conversationId,
      userId: userMessage.userId,
      createdAt: new Date().toISOString(),
      sender: MessageSenderValues.BOT,
    });
    await this.commandBus.execute(createMessageCommand);
    return createMessageCommand;
  }
  private async createUserMessage(message: PostMessagesRequest['message']) {
    const createMessageCommand = new CreateMessageCommand({
      id: message.id,
      content: message.content,
      conversationId: message.conversationId,
      userId: message.userId,
      createdAt: message.createdAt,
      sender: message.sender,
    });
    await this.commandBus.execute(createMessageCommand);
  }
}
