import { asClass } from 'awilix';
import { ConversationsGetController } from '../../controllers/ConversationsGetController';
import { ConversationsPostController } from '../../controllers/ConversationsPostController';
import { StatusGetController } from '../../controllers/StatusGetController';
import { MessagesGetController } from '../../controllers/MessagesGetController';
import { MessagesPostController } from '../../controllers/MessagesPostController';

const dependencies = {
        "StatusGetController": asClass(StatusGetController),
        "MessagesPostController": asClass(MessagesPostController),
        "MessagesGetController": asClass(MessagesGetController),
        "ConversationGetController": asClass(ConversationsGetController),
        "ConversationPostController": asClass(ConversationsPostController),
}
export default dependencies; 