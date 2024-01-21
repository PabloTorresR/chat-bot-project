import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';
// import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

export type PostMessageRequest = {
  id: string;
  name: string;
  duration: string;
};

export class MessagePostController implements Controller {
  //   constructor(private readonly commandBus: CommandBus) {}
  async run(req: Request<PostMessageRequest>, res: Response) {
    await this.createCourse(req);
    res.status(httpStatus.OK).send();
  }

  private async createCourse(req: Request<PostMessageRequest>) {
    //NOTE: create eventBus
    // const createCourseCommand = new CreateCourseCommand({
    //   id: req.body.id,
    //   name: req.body.name,
    //   duration: req.body.duration,
    // });

    // await this.commandBus.dispatch(createCourseCommand);
    console.log(req.body);
  }
}
