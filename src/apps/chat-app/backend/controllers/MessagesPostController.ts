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

type PostMessagesRequest = Request & {
  message: { id: string; content: string; conversationId: string; createdAt: string };
  messageHistory: HistoryMessage[];
};

type PostMessagesResponse = {
  id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
};

const HARDCODED_USER_ID = '2b54f894-78d1-45a7-bbe5-06238f8d5434';

const FAKE_RESPONSE = {
  id: '123',
  content: 'Hello world',
  userId: HARDCODED_USER_ID,
  createdAt: new Date().toISOString(),
};

export class MessagesPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: PostMessagesRequest, res: Response<PostMessagesResponse>) {
    await this.createMessage(req);
    //NOTE: call the OpenAI service and get the response

    res.status(httpStatus.OK).json({ ...FAKE_RESPONSE, conversationId: req.body.conversationId, id: uuidv4() });
  }

  private async createMessage(req: PostMessagesRequest) {
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
}
