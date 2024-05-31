import { Express, Request, Response } from 'express';
import container from '../dependency-injection';
import { MessagesPostController } from '../controllers/MessagesPostController';
import { MessagesGetController } from '../controllers/MessagesGetController';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

const register = (app: Express) => {
  const reqSchema = [
    body('message.id').exists().isString(),
    body('message.content').exists().isString(),
    body('message.conversationId').exists().isString(),
    body('message.userId').exists().isString(),
    body('message.createdAt').exists().isString(),
  ];

  const messagesPostController: MessagesPostController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagesPostController',
  );
  const messagesGetController: MessagesGetController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagesGetController',
  );
  app.post('/messages', reqSchema, validateReqSchema, (req: Request, res: Response) =>
    messagesPostController.run(req, res),
  );
  app.get('/messages', messagesGetController.run.bind(messagesGetController));
};

export default { register };