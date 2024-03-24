import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { CreateMessageCommand } from '../../../../Contexts/Chatapp/Messages/domain/CreateMessageCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { v4 as uuidv4 } from 'uuid';
import { MessageSenderValues } from '../../../../Contexts/Chatapp/Messages/domain/MessageSender';
import { PostMessagesRequest, PostMessagesResponse } from 'libs/dtos/chatapp/messages';
import axios from 'axios';

const HARDCODED_USER_ID = '2b54f894-78d1-45a7-bbe5-06238f8d5434';
export class MessagesPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request & { body: PostMessagesRequest }, res: Response<PostMessagesResponse>) {
    const chatbotMessage = await this.sendMessage(req.body);
    await this.createMessage(req.body);

    res.status(httpStatus.OK).json({
      ...req.body.message,
      content: chatbotMessage,
      id: uuidv4(),
      sender: MessageSenderValues.BOT,
      createdAt: new Date().toISOString(),
    });
  }

  private async createMessage(body: PostMessagesRequest) {
    const createMessageCommand = new CreateMessageCommand({
      id: body.message.id,
      content: body.message.content,
      conversationId: body.message.conversationId,
      userId: HARDCODED_USER_ID,
      createdAt: body.message.createdAt,
      sender: MessageSenderValues.USER,
    });
    await this.commandBus.dispatch(createMessageCommand);
  }

  private async sendMessage(body: PostMessagesRequest) {
    const response = await axios.post('http://0.0.0.0:8000/message/answer', body, {});

    if (response.status !== 200) {
      throw new Error('Failed to send message');
    }

    return response.data;
  }
}
