import { Express } from 'express';
import { ConversationsPostController } from '../controllers/ConversationsPostController';
import { ConversationsGetController } from '../controllers/ConversationsGetController';
import container from '../dependency-injection-awilix';

const register = (app: Express) => {
  const conversationsPostController: ConversationsPostController = container.resolve('ConversationPostController');
  const conversationsGetController: ConversationsGetController = container.resolve('ConversationGetController');
  app.post('/conversations', conversationsPostController.run.bind(conversationsPostController));
  app.get('/conversations', conversationsGetController.run.bind(conversationsGetController));
};

export default { register };
