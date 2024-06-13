import { CreateConversationCommandHandler } from 'chatapp-context/Conversations/application/Create/CreateConversationCommandHandler.nest';
import { SearchConversationsByCriteriaQueryHandler } from 'chatapp-context/Conversations/application/SearchByCriteria/SearchConversationsByCriteriaQueryHandler.nest';
import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationsByCriteriaSearcher } from 'chatapp-context/Conversations/application/SearchByCriteria/ConversationsByCriteriaSearcher.nest';
import { DbModule } from '../db/db.module';
import { ConversationCreator } from 'chatapp-context/Conversations/application/Create/ConversationCreator.nest';

const commandHandlers = [CreateConversationCommandHandler];
const queryHandlers = [SearchConversationsByCriteriaQueryHandler];

@Module({
  imports: [CqrsModule, DbModule],
  controllers: [ConversationsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ConversationsService,
    ConversationCreator,
    ConversationsByCriteriaSearcher,
  ],
})
export class ConversationsModule {}
