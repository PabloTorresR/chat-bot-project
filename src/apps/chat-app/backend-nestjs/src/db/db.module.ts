import { DynamoDBMessageRepository } from './../../../../../Contexts/Chatapp/Messages/infrastructure/persistence/dynamodb/DynamoDBMessageRepository';
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
];

@Module({
  providers: [...repositoryProviders, ...providers],
  exports: [...repositoryProviders],
})
export class DbModule {}
