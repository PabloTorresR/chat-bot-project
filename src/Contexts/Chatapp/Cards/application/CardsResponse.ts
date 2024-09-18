import { Card } from '../domain/Card';

interface CardResponse {
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
}

export class CardsResponse {
  public readonly cards: CardResponse[];

  constructor(cards: Card[]) {
    this.cards = cards.map(card => card.toPrimitives());
  }
}
