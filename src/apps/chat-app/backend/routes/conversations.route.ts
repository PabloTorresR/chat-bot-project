import { Express } from 'express';
import container from '../dependency-injection';
import { ConversationsPostController } from '../controllers/ConversationsPostController';
import { ConversationsGetController } from '../controllers/ConversationsGetController';

const register = (app: Express) => {
  const conversationsPostController: ConversationsPostController = container.get(
    'Apps.Chatapp.Backend.controllers.ConversationsPostController',
  );
  const conversationsGetController: ConversationsGetController = container.get(
    'Apps.Chatapp.Backend.controllers.ConversationsGetController',
  );
  app.post('/conversations', conversationsPostController.run.bind(conversationsPostController));
  app.get('/conversations', conversationsGetController.run.bind(conversationsGetController));
};

export default { register };
