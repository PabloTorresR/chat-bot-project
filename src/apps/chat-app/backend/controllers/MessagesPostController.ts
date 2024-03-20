import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateMessageCommand } from '../../../../Contexts/Chatapp/Messages/domain/CreateMessageCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { v4 as uuidv4 } from 'uuid';
import { MessageSenderValues } from '../../../../Contexts/Chatapp/Messages/domain/MessageSender';

type HistoryMessage = {
  content: string;
  createdAt: string;
  sender: string;
};

type MessagesPostRequest = Request & {
  body: {
    message: { id: string; content: string; conversationId: string; createdAt: string };
    messageHistory: HistoryMessage[];
  };
};

type PostMessagesResponse = {
  id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
};

const HARDCODED_USER_ID = '2b54f894-78d1-45a7-bbe5-06238f8d5434';

export class MessagesPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: MessagesPostRequest, res: Response<PostMessagesResponse>) {
    const chatbotMessage = await this.sendMessage(req);
    await this.createMessage(req);

    res.status(httpStatus.OK).json({
      ...req.body.message,
      content: chatbotMessage,
      id: uuidv4(),
      sender: MessageSenderValues.BOT,
      createdAt: new Date().toISOString(),
    });
  }

  private async createMessage(req: MessagesPostRequest) {
    const createMessageCommand = new CreateMessageCommand({
      id: req.body.message.id,
      content: req.body.message.content,
      conversationId: req.body.message.conversationId,
      userId: HARDCODED_USER_ID,
      createdAt: req.body.message.createdAt,
      sender: MessageSenderValues.USER,
    });
    await this.commandBus.dispatch(createMessageCommand);
  }

  private async sendMessage(req: MessagesPostRequest) {
    const response = await fetch('http://localhost:8000/message/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data;
  }
}
