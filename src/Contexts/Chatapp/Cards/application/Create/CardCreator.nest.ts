import { CardId } from '../../../Shared/domain/CardId';
import { Card } from '../../domain/Card';
import { CardRepository } from '../../domain/CardRepository';
import { UserId } from '../../../Shared/domain/UserId';
import {
  CardWord,
  CardCreatedAt,
  CardDifficulty,
  CardExamples,
  CardIsLearned,
  CardLanguage,
  CardNativeLanguage,
  CardNativeWord,
  CardTopics,
} from '../../domain/CardDomainValueObjects';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class CardCreator {
  constructor(@Inject('CardRepository') private repository: CardRepository, private eventBus: EventBus) {}

  async run(params: {
    readonly id: CardId;
    readonly word: CardWord;
    readonly nativeWord: CardNativeWord;
    readonly language: CardLanguage;
    readonly nativeLanguage: CardNativeLanguage;
    readonly examples: CardExamples;
    readonly difficulty: CardDifficulty;
    readonly isLearned: CardIsLearned;
    readonly createdAt: CardCreatedAt;
    readonly userId: UserId;
    readonly topics: CardTopics;
  }): Promise<void> {
    const card = Card.create(
      params.id,
      params.word,
      params.nativeWord,
      params.language,
      params.nativeLanguage,
      params.examples,
      params.difficulty,
      params.isLearned,
      params.createdAt,
      params.userId,
      params.topics,
    );
    await this.repository.save(card);
    await this.eventBus.publish(card.pullDomainEvents());
  }
}
