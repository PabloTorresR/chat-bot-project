import { IsString, IsUUID, IsBoolean, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { PostCardsRequest } from 'dtos-lib/chatapp/cards';

export class CardCreateDto implements PostCardsRequest {
  @IsUUID()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  word: string;

  @IsString()
  nativeWord: string;

  @IsString()
  language: string;

  @IsString()
  nativeLanguage: string;

  @ValidateNested()
  examples: {
    example?: string;
    nativeExample?: string;
    movieExample?: string;
    nativeMovieExample?: string;
  };

  @Min(1)
  @Max(5)
  @IsInt()
  difficulty: number;

  @IsBoolean()
  isLearned: boolean;

  @IsString()
  createdAt: string;

  @IsString({ each: true })
  topics: string[];
}
