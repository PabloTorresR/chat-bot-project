import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';
// import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

type PostMessageRequest = {
  id: string;
  content: string;
};

type PostMessageResponse = {
  id: string;
  content: string;
};

const defaultMessageResponse: PostMessageResponse = {
  id: '1',
  content: 'Hello world',
};

export class MessagePostController implements Controller {
  //   constructor(private readonly commandBus: CommandBus) {}
  async run(req: Request<PostMessageRequest>, res: Response<PostMessageResponse>) {
    res.status(httpStatus.OK).json(defaultMessageResponse);
  }

  // private async createCourse(req: Request<PostMessageRequest>) {
  //   const createCourseCommand = new CreateCourseCommand({
  //     id: req.body.id,
  //     name: req.body.name,
  //     duration: req.body.duration,
  //   });

  //   await this.commandBus.dispatch(createCourseCommand);
  // }
}
