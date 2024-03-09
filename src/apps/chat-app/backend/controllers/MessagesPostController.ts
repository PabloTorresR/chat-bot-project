import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateMessageCommand } from '../../../../Contexts/Chatapp/Messages/domain/CreateMessageCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { v4 as uuidv4 } from 'uuid';

type PostMessagesRequest = {
  id: string;
  content: string;
  conversationId: string;
  createdAt: string;
  //NOTE: implement messageHistory
  // messageHistory: Array<Message>;
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

  async run(req: Request<PostMessagesRequest>, res: Response<PostMessagesResponse>) {
    await this.createMessage(req);
    //NOTE: call the OpenAI service and get the response

    res.status(httpStatus.OK).json({ ...FAKE_RESPONSE, conversationId: req.body.conversationId, id: uuidv4() });
  }

  private async createMessage(req: Request<PostMessagesRequest>) {
    console.log(req.body);
    const createMessageCommand = new CreateMessageCommand({
      id: req.body.id,
      content: req.body.content,
      conversationId: req.body.conversationId,
      userId: HARDCODED_USER_ID,
      createdAt: req.body.createdAt,
    });

    await this.commandBus.dispatch(createMessageCommand);
  }
}
