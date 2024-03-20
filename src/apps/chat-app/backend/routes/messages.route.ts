import { Express,Request,Response } from 'express';
import container from '../dependency-injection';
import { MessagesPostController } from '../controllers/MessagesPostController';
import { MessagesGetController } from '../controllers/MessagesGetController';

export const register = (app: Express) => {
  const messagesPostController: MessagesPostController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagesPostController',
  );
  const messagesGetController: MessagesGetController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagesGetController',
  );
  app.post('/messages', (req: Request, res: Response) =>
  messagesPostController.run(req, res)
  );
  app.get('/messages', messagesGetController.run.bind(messagesGetController));
};
