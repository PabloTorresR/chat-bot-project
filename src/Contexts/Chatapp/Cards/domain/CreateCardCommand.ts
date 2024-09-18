import { Command } from 'shared-context/domain/Command';

type Params = {
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
};

export class CreateCardCommand extends Command {
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

  constructor({
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
  }: Params) {
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
}
