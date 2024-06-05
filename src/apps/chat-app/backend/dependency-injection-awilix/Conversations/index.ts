import { asClass } from 'awilix';
import { ConversationsByCriteriaSearcher } from '../../../../../Contexts/Chatapp/Conversations/application/SearchByCriteria/ConversationsByCriteriaSearcher';
import { DynamoDBConversationRepository } from '../../../../../Contexts/Chatapp/Conversations/infrastructure/persistence/dynamodb/DynamoDBConversationRepository';

const dependencies = {
  conversationsSearcher: asClass(ConversationsByCriteriaSearcher),
  conversationRepository: asClass(DynamoDBConversationRepository),
};
export default dependencies;
