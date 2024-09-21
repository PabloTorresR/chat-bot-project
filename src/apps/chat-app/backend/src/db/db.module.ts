import { DynamoDBCardRepository } from 'chatapp-context/Cards/infraestructure/persistence/dynamodb/DynamoDBCardRepository';
import { DynamoDBMessageRepository } from 'chatapp-context/Messages/infrastructure/persistence/dynamodb/DynamoDBMessageRepository';
import { DynamoDBConversationRepository } from 'chatapp-context/Conversations/infrastructure/persistence/dynamodb/DynamoDBConversationRepository';
import { Module } from '@nestjs/common';
import { providers } from './db.providers';

const repositoryProviders = [
  {
    provide: 'ConversationRepository',
    useClass: DynamoDBConversationRepository,
  },
  {
    provide: 'MessageRepository',
    useClass: DynamoDBMessageRepository,
  },
  {
    provide: 'CardRepository',
    useClass: DynamoDBCardRepository,
  },
];

@Module({
  providers: [...repositoryProviders, ...providers],
  exports: [...repositoryProviders],
})
export class DbModule {}
