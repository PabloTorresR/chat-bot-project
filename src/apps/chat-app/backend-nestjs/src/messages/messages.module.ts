import { SearchMessagesByCriteriaQueryHandler } from 'chatapp-context/Messages/application/SearchByCriteria/SearchMessagesByCriteriaQueryHandler.nest';
import { CreateMessageCommandHandler } from 'chatapp-context/Messages/application/Create/CreateMessageCommandHandler.nest';
import { LlmServiceMessageAnswerGenerator } from 'chatapp-context/Messages/infrastructure/services/LlmServiceMessageAnswerGenerator';
import { LlmServiceMessageAnswerGenerator as LlmServiceMessageAnswerGeneratorDev } from 'chatapp-context/Messages/infrastructure/services/LlmServiceMessageAnswerGenerator.dev';
import { MessageCreator } from 'chatapp-context/Messages/application/Create/MessageCreator.nest';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { DbModule } from '../db/db.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MessagesByCriteriaSearcher } from 'chatapp-context/Messages/application/SearchByCriteria/MessagesByCriteriaSearcher.nest';

const commandHandlers = [CreateMessageCommandHandler];
const queryHandlers = [SearchMessagesByCriteriaQueryHandler];

@Module({
  imports: [CqrsModule, DbModule],
  controllers: [MessagesController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    MessagesService,
    LlmServiceMessageAnswerGenerator,
    { provide: 'MessageCreator', useClass: MessageCreator },
    MessagesByCriteriaSearcher,
    {
      provide: 'MessageAnswerGenerator',
      useClass: process.env.LLM_ENV === 'dev' ? LlmServiceMessageAnswerGeneratorDev : LlmServiceMessageAnswerGenerator,
    },
  ],
})
export class MessagesModule {}
