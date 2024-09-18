export interface LlmVocabulary {
  words: LlmWord[];
  language: string;
  nativeLanguage: string;
  topics: string[];
}

export interface LlmWord {
  word: string;
  nativeWord: string;
  difficulty: number;
  examples: {
    example: string;
    nativeExample: string;
    movieExample: string;
    nativeMovieExample: string;
  };
}
export interface Card extends LlmWord {
  id: string;
  language: string;
  nativeLanguage: string;
  isLearned: boolean;
  createdAt: string;
  userId: string;
  topics: string[];
}
