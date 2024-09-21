import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateCardCommand } from 'chatapp-context/Cards/domain/CreateCardCommand';
import { QueryParams } from 'dtos-lib/chatapp/filters';
import { CardCreateDto } from './dto/card.create.dto';
import { parseFilters } from 'src/conversations/utils/parse-filters';
import { SearchCardsByCriteriaQuery } from 'chatapp-context/Cards/application/SearchByCriteria/SearchCardsByCriteriaQuery';
import { CardsResponse } from 'chatapp-context/Cards/application/CardsResponse';
import { GetCardsResponse } from 'dtos-lib/chatapp/cards';

@Injectable()
export class CardsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAll({ filters, orderBy, orderType, limit, offset }: QueryParams): Promise<GetCardsResponse> {
    const query = new SearchCardsByCriteriaQuery(
      parseFilters(filters),
      orderBy,
      orderType,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );

    const cardsResponse = await this.queryBus.execute<SearchCardsByCriteriaQuery, CardsResponse>(query);
    return cardsResponse.cards;
  }

  // async getById(id: string) {
  //   return this.queryBus.execute(new GetCardByIdQuery(id));
  // }

  async create(card: CardCreateDto) {
    const createCardCommand = new CreateCardCommand({
      id: card.id,
      word: card.word,
      nativeWord: card.nativeWord,
      language: card.language,
      nativeLanguage: card.nativeLanguage,
      examples: card.examples,
      difficulty: card.difficulty,
      isLearned: card.isLearned,
      createdAt: card.createdAt,
      userId: card.userId,
      topics: card.topics,
    });
    return this.commandBus.execute(createCardCommand);
  }

  // async update(id: string, updatedCard: Card) {
  //   return this.commandBus.execute(new UpdateCardCommand(id, updatedCard));
  // }

  // async delete(id: string) {
  //   return this.commandBus.execute(new DeleteCardCommand(id));
  // }
}
