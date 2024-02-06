import { Express } from 'express';
import container from '../dependency-injection';
import { StatusGetController } from '../controllers/StatusGetController';

export const register = (app: Express) => {
  const statusGetController: StatusGetController = container.get(
    'Apps.Chatapp.Backend.controllers.StatusGetController',
  );

  app.get('/status', statusGetController.run.bind(statusGetController));
};
