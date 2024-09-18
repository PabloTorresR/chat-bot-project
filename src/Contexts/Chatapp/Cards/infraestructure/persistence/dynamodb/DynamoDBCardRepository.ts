import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { CardRepository } from '../../../domain/CardRepository';
import { Card } from '../../../domain/Card';
import { DynamoDBRepository } from 'shared-context/infrastructure/persistence/dynamodb/DynamoDBRepository';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

interface CardDocument extends Document {
  _id: string;
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
  topics: string[];
}

@Injectable()
export class DynamoDBCardRepository extends DynamoDBRepository<Card> implements CardRepository {
  public save(card: Card): Promise<void> {
    return this.persist(card.id.value, card);
  }

  protected tableName(): string {
    const env = this.getEnv();
    return env === 'prod' ? 'cards-table' : `cards-table-${env}`;
  }

  public async searchAll(): Promise<Card[]> {
    const table = this.tableName();
    const client = this.getClient();
    const result = await (await client).send(new ScanCommand({ TableName: table }));
    const documents = result.Items;
    return (
      documents?.map(document =>
        Card.fromPrimitives({
          id: document._id,
          word: document.word,
          nativeWord: document.nativeWord,
          language: document.language,
          nativeLanguage: document.nativeLanguage,
          examples: document.examples,
          difficulty: document.difficulty,
          isLearned: document.isLearned,
          createdAt: document.createdAt,
          userId: document.userId,
          topics: document.topics,
        }),
      ) ?? ([] as Card[])
    );
  }

  public async matching(criteria: Criteria): Promise<Card[]> {
    const documents = await this.searchByCriteria<CardDocument>(criteria);

    return documents.map(document =>
      Card.fromPrimitives({
        id: document._id,
        word: document.word,
        nativeWord: document.nativeWord,
        language: document.language,
        nativeLanguage: document.nativeLanguage,
        examples: document.examples,
        difficulty: document.difficulty,
        isLearned: document.isLearned,
        createdAt: document.createdAt,
        userId: document.userId,
        topics: document.topics,
      }),
    );
  }
}
