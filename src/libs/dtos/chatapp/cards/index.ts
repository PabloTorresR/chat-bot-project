export type PostCardsRequest = {
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

export type PostCardsResponse = {
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

export type GetCardsResponse = {
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
}[];
