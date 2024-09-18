import { CreateCardCommandHandler } from 'chatapp-context/Cards/application/Create/CreateCardCommandHandler.nest';
import { SearchCardsByCriteriaQueryHandler } from 'chatapp-context/Cards/application/SearchByCriteria/SearchCardsByCriteriaQueryHandler.nest';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CardsByCriteriaSearcher } from 'chatapp-context/Cards/application/SearchByCriteria/CardsByCriteriaSearcher.nest';
import { DbModule } from '../db/db.module';
import { CardCreator } from 'chatapp-context/Cards/application/Create/CardCreator.nest';

const commandHandlers = [CreateCardCommandHandler];
const queryHandlers = [SearchCardsByCriteriaQueryHandler];
@Module({
  imports: [CqrsModule, DbModule],
  controllers: [CardsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    CardsService,
    { provide: 'CardCreator', useClass: CardCreator },
    CardsByCriteriaSearcher,
  ],
})
export class CardsModule {}
