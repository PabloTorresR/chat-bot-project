import { CreateConversationCommandHandler } from './../../../../../Contexts/Chatapp/Conversations/application/Create/CreateConversationCommandHandler';
import { asArray } from '../resolvers';
import { InMemoryCommandBus } from '../../../../../Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus';
import { asClass, asFunction, asValue } from 'awilix';
import { CreateMessageCommandHandler } from '../../../../../Contexts/Chatapp/Messages/application/Create/CreateMessageCommandHandler';
import { SearchMessagesByCriteriaQueryHandler } from '../../../../../Contexts/Chatapp/Messages/application/SearchByCriteria/SearchMessagesByCriteriaQueryHandler';
import { SearchConversationsByCriteriaQueryHandler } from '../../../../../Contexts/Chatapp/Conversations/application/SearchByCriteria/SearchConversationsByCriteriaQueryHandler';
import { DynamoDBClientFactory } from '../../../../../Contexts/Shared/infrastructure/persistence/dynamodb/DynamoDBClientFactory';
import { DynamoDBConfigFactory } from '../../../../../Contexts/Chatapp/Shared/infrastructure/persistence/dynamodb/DynamoDBConfigFactory';
import { InMemoryQueryBus } from '../../../../../Contexts/Shared/infrastructure/QueryBus/InMemoryQueryBus';

// const client = DynamoDBClientFactory.createClient('chat-app', dynamoDbConfig);

const commandHandlers = [asClass(CreateConversationCommandHandler), asClass(CreateMessageCommandHandler)];
const queryHandlers = [
  asClass(SearchConversationsByCriteriaQueryHandler),
  asClass(SearchMessagesByCriteriaQueryHandler),
];
const sharedDependencies = {
  commandBus: asClass(InMemoryCommandBus),
  queryBus: asClass(InMemoryQueryBus),
  commandHandlers: asArray(commandHandlers),
  queryHandlers: asArray(queryHandlers),
  contextName: asValue('chat-app'),
  dynamoDBConfig: asFunction(DynamoDBConfigFactory.createConfig).singleton(),
  _client: asFunction(DynamoDBClientFactory.createClient),
};
export default sharedDependencies;
