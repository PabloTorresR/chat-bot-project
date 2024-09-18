import { CardCreatedDomainEvent } from './CardCreatedDomainEvent';
import { CardId } from '../../Shared/domain/CardId';
import { AggregateRoot } from 'shared-context/domain/AggregateRoot';
import { UserId } from '../../Shared/domain/UserId';
import {
  CardExamples,
  CardDifficulty,
  CardIsLearned,
  CardLanguage,
  CardNativeLanguage,
  CardNativeWord,
  CardWord,
  CardCreatedAt,
  CardTopics,
} from './CardDomainValueObjects';

export class Card extends AggregateRoot {
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

  constructor(
    id: CardId,
    word: CardWord,
    nativeWord: CardNativeWord,
    language: CardLanguage,
    nativeLanguage: CardNativeLanguage,
    examples: CardExamples,
    difficulty: CardDifficulty,
    isLearned: CardIsLearned,
    createdAt: CardCreatedAt,
    userId: UserId,
    topics: CardTopics,
  ) {
    super();
    this.id = id;
    this.word = word;
    this.nativeWord = nativeWord;
    this.language = language;
    this.nativeLanguage = nativeLanguage;
    this.examples = examples;
    this.difficulty = difficulty;
    this.isLearned = isLearned;
    this.createdAt = createdAt;
    this.userId = userId;
    this.topics = topics;
  }

  static create(
    id: CardId,
    word: CardWord,
    nativeWord: CardNativeWord,
    language: CardLanguage,
    nativeLanguage: CardNativeLanguage,
    examples: CardExamples,
    difficulty: CardDifficulty,
    isLearned: CardIsLearned,
    createdAt: CardCreatedAt,
    userId: UserId,
    topics: CardTopics,
  ): Card {
    const card = new Card(
      id,
      word,
      nativeWord,
      language,
      nativeLanguage,
      examples,
      difficulty,
      isLearned,
      createdAt,
      userId,
      topics,
    );

    card.record(
      new CardCreatedDomainEvent({
        aggregateId: card.id.value,
        word: card.word.value,
        nativeWord: card.nativeWord.value,
        language: card.language.value,
        nativeLanguage: card.nativeLanguage.value,
        examples: card.examples.toPrimitives(),
        difficulty: card.difficulty.value,
        isLearned: card.isLearned.value,
        createdAt: card.createdAt.value.toString(),
        userId: card.userId.value,
        topics: card.topics.toString(),
      }),
    );

    return card;
  }

  static fromPrimitives(plainData: {
    id: string;
    word: string;
    nativeWord: string;
    language: string;
    nativeLanguage: string;
    examples: {
      example?: string;
      nativeExample?: string;
      movieExample?: string;
      nativeMovieExample?: string;
    };
    difficulty: number;
    isLearned: boolean;
    createdAt: string;
    userId: string;
    topics: string[];
  }): Card {
    return new Card(
      new CardId(plainData.id),
      new CardWord(plainData.word),
      new CardNativeWord(plainData.nativeWord),
      new CardLanguage(plainData.language),
      new CardNativeLanguage(plainData.nativeLanguage),
      new CardExamples(plainData.examples),
      new CardDifficulty(plainData.difficulty),
      new CardIsLearned(plainData.isLearned),
      CardCreatedAt.createFromString(plainData.createdAt),
      new UserId(plainData.userId),
      new CardTopics(plainData.topics),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      word: this.word.value,
      nativeWord: this.nativeWord.value,
      language: this.language.value,
      nativeLanguage: this.nativeLanguage.value,
      examples: this.examples.toPrimitives(),
      difficulty: this.difficulty.value,
      isLearned: this.isLearned.value,
      createdAt: this.createdAt.value.toString(),
      userId: this.userId.value,
      topics: this.topics.value,
    };
  }
}
