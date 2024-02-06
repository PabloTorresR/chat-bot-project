import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';
// import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

type PostConversationsRequest = {
  id: string;
  title: string;
};

type PostConversationsResponse = {
  id: string;
  title: string;
};

const defaultConversationsResponse: PostConversationsResponse = {
  id: '1',
  title: 'Hello world',
};

export class ConversationsPostController implements Controller {
  //   constructor(private readonly commandBus: CommandBus) {}
  async run(req: Request<PostConversationsRequest>, res: Response<PostConversationsResponse>) {
    res.status(httpStatus.OK).json(defaultConversationsResponse);
  }
}
