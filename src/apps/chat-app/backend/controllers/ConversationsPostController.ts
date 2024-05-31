import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateConversationCommand } from '../../../../Contexts/Chatapp/Conversations/domain/CreateConversationCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { PostConversationsRequest, PostConversationsResponse } from 'dtos-lib/chatapp/conversations';

export class ConversationsPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request<PostConversationsRequest>, res: Response<PostConversationsResponse>) {
    await this.createConversation(req);
    res.status(httpStatus.OK).send();
  }

  private async createConversation(req: Request<PostConversationsRequest>) {
    const createConversationCommand = new CreateConversationCommand({
      id: req.body.id,
      title: req.body.title,
      userId: req.body.userId,
    });

    await this.commandBus.dispatch(createConversationCommand);
  }
}
