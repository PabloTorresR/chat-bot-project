import { Express } from 'express';
import container from '../dependency-injection';
import { MessagePostController } from '../controllers/MessagePostController';

export const register = (app: Express) => {
  const messagePostController: MessagePostController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagePostController',
  );
  app.post('/messages', messagePostController.run.bind(messagePostController));
};
