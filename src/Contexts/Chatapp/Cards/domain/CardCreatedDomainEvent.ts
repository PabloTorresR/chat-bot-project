import { DomainEvent } from 'shared-context/domain/DomainEvent';

type CreateCardDomainEventAttributes = {
  readonly word: string;
  readonly nativeWord: string;
  readonly language: string;
  readonly nativeLanguage: string;
  readonly examples: {
    example: string;
    nativeExample: string;
    movieExample: string;
    nativeMovieExample: string;
  };
  readonly difficulty: number;
  readonly isLearned: boolean;
  readonly createdAt: string;
  readonly userId: string;
  readonly topics: string;
};
export class CardCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'chatapp.card.created';

  readonly word: string;
  readonly nativeWord: string;
  readonly language: string;
  readonly nativeLanguage: string;
  readonly examples: {
    example: string;
    nativeExample: string;
    movieExample: string;
    nativeMovieExample: string;
  };
  readonly difficulty: number;
  readonly isLearned: boolean;
  readonly createdAt: string;
  readonly userId: string;
  readonly topics: string;

  constructor({
    aggregateId,
    word,
    nativeWord,
    language,
    nativeLanguage,
    examples,
    difficulty,
    isLearned,
    createdAt,
    userId,
    eventId,
    occurredOn,
    topics,
  }: {
    aggregateId: string;
    word: string;
    nativeWord: string;
    language: string;
    nativeLanguage: string;
    examples: {
      example: string;
      nativeExample: string;
      movieExample: string;
      nativeMovieExample: string;
    };
    difficulty: number;
    isLearned: boolean;
    createdAt: string;
    userId: string;
    eventId?: string;
    occurredOn?: Date;
    topics: string;
  }) {
    super({ eventName: CardCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
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

  toPrimitives(): CreateCardDomainEventAttributes {
    return {
      word: this.word,
      nativeWord: this.nativeWord,
      language: this.language,
      nativeLanguage: this.nativeLanguage,
      examples: this.examples,
      difficulty: this.difficulty,
      isLearned: this.isLearned,
      createdAt: this.createdAt,
      userId: this.userId,
      topics: this.topics,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateCardDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new CardCreatedDomainEvent({
      aggregateId,
      word: attributes.word,
      nativeWord: attributes.nativeWord,
      language: attributes.language,
      nativeLanguage: attributes.nativeLanguage,
      examples: attributes.examples,
      difficulty: attributes.difficulty,
      isLearned: attributes.isLearned,
      createdAt: attributes.createdAt,
      userId: attributes.userId,
      topics: attributes.topics,
      eventId,
      occurredOn,
    });
  }
}
