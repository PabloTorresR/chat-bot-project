import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { PostMessagesRequest, PostMessagesResponse } from 'libs/dtos/chatapp/messages';

export class MessagesPostController implements Controller {
  constructor(private readonly messageAnswerUseCase) {}

  async run(req: Request & { body: PostMessagesRequest }, res: Response<PostMessagesResponse>) {
    const data = await this.messageAnswerUseCase.run(req.body);

    res.status(httpStatus.OK).json(data);
  }
}
