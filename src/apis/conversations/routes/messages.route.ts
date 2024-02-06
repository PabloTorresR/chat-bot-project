import { Express } from 'express';
import container from '../dependency-injection';
import { MessagesPostController } from '../controllers/MessagesPostController';

export const register = (app: Express) => {
  const messagesPostController: MessagesPostController = container.get(
    'Apps.Chatapp.Backend.controllers.MessagesPostController',
  );
  app.post('/messages', messagesPostController.run.bind(messagesPostController));
};
