import { DynamoDBClientFactory } from './../../../../../Contexts/Shared/infrastructure/persistence/dynamodb/DynamoDBClientFactory';
import { DynamoDBConfigFactory } from './../../../../../Contexts/Chatapp/Shared/infrastructure/persistence/dynamodb/DynamoDBConfigFactory';

export const providers = [
  {
    provide: 'contextName',
    useValue: 'chatapp',
  },
  {
    provide: 'config',
    useFactory: async () => {
      return await DynamoDBConfigFactory.createConfig();
    },
  },
  {
    provide: 'DynamoDBDocumentClient',
    useFactory: async () => {
      const configProvider = providers.find(provider => provider.provide === 'config');
      const config = await configProvider.useFactory();
      const contextNameProvider = providers.find(provider => provider.provide === 'contextName');
      const contextName = contextNameProvider.useValue;
      return DynamoDBClientFactory.createClient(contextName, config);
    },
  },
];
