import { DeleteAllMessagesByConversationIdCommandHandler } from 'chatapp-context/Messages/application/DeleteAllByConversationId/DeleteAllMessagesByConversationIdCommandHandler';
import { MessagesDeletor } from 'chatapp-context/Messages/application/Delete/MessagesDeletor';
import { SearchMessagesByCriteriaQueryHandler } from 'chatapp-context/Messages/application/SearchByCriteria/SearchMessagesByCriteriaQueryHandler.nest';
import { CreateMessageCommandHandler } from 'chatapp-context/Messages/application/Create/CreateMessageCommandHandler.nest';
import { LlmServiceMessageAnswerGenerator } from 'chatapp-context/Messages/infrastructure/services/LlmServiceMessageAnswerGenerator';
import { MessageCreator } from 'chatapp-context/Messages/application/Create/MessageCreator.nest';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { DbModule } from '../db/db.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MessagesByCriteriaSearcher } from 'chatapp-context/Messages/application/SearchByCriteria/MessagesByCriteriaSearcher.nest';
import { AwsModule } from '../aws/aws.module';

const commandHandlers = [CreateMessageCommandHandler, DeleteAllMessagesByConversationIdCommandHandler];
const queryHandlers = [SearchMessagesByCriteriaQueryHandler];
const mesageAnswerGeneratorProvider = {
  provide: 'MessageAnswerGenerator',
  useClass: LlmServiceMessageAnswerGenerator,
};
@Module({
  imports: [CqrsModule, DbModule, AwsModule],
  controllers: [MessagesController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    MessagesService,
    LlmServiceMessageAnswerGenerator,
    { provide: 'MessageCreator', useClass: MessageCreator },
    { provide: 'MessagesDeletor', useClass: MessagesDeletor },
    MessagesByCriteriaSearcher,
    mesageAnswerGeneratorProvider,
  ],
  exports: [MessagesService, mesageAnswerGeneratorProvider], //NOTE: weirdly answer generator is required by conversations module (??)
})
export class MessagesModule {}
