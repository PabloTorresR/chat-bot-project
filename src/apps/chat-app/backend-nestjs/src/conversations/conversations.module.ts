import { DeleteConversationCommandHandler } from 'chatapp-context/Conversations/application/Delete/DeleteConversationCommandHandler';
import { ConversationsDeletor } from 'chatapp-context/Conversations/application/Delete/ConversationsDeletor';
import { CreateConversationCommandHandler } from 'chatapp-context/Conversations/application/Create/CreateConversationCommandHandler.nest';
import { SearchConversationsByCriteriaQueryHandler } from 'chatapp-context/Conversations/application/SearchByCriteria/SearchConversationsByCriteriaQueryHandler.nest';
import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationsByCriteriaSearcher } from 'chatapp-context/Conversations/application/SearchByCriteria/ConversationsByCriteriaSearcher.nest';
import { DbModule } from '../db/db.module';
import { ConversationCreator } from 'chatapp-context/Conversations/application/Create/ConversationCreator.nest';
import { MessagesModule } from '../messages/messages.module';
import { MessagesService } from '../messages/messages.service';

const commandHandlers = [CreateConversationCommandHandler, DeleteConversationCommandHandler];
const queryHandlers = [SearchConversationsByCriteriaQueryHandler];

@Module({
  imports: [CqrsModule, DbModule, MessagesModule],
  controllers: [ConversationsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ConversationsService,
    ConversationCreator,
    { provide: 'ConversationsDeletor', useClass: ConversationsDeletor },
    ConversationsByCriteriaSearcher,
    MessagesService,
  ],
})
export class ConversationsModule {}
