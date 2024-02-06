import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';
// import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

type PostMessagesRequest = {
  id: string;
  content: string;
};

type PostMessagesResponse = {
  id: string;
  content: string;
};

const defaultMessagesResponse: PostMessagesResponse = {
  id: '1',
  content: 'Hello world',
};

export class MessagesPostController implements Controller {
  //   constructor(private readonly commandBus: CommandBus) {}
  async run(req: Request<PostMessagesRequest>, res: Response<PostMessagesResponse>) {
    res.status(httpStatus.OK).json(defaultMessagesResponse);
  }
}
