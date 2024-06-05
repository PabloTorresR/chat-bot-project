import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBCriteriaConverter } from './DynamoDBCriteriaConverter';

export abstract class DynamoDBRepository<T extends AggregateRoot> {
  private criteriaConverter: DynamoDBCriteriaConverter;

  constructor(private _client: DynamoDBDocumentClient, private NODE_ENV: string) {
    this.criteriaConverter = new DynamoDBCriteriaConverter();
  }

  protected getEnv(): string {
    return process.env.NODE_ENV ?? '';
  }

  protected abstract tableName(): string;

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const params = {
      TableName: this.tableName(),
      Item: {
        _id: id,
        ...aggregateRoot.toPrimitives(),
      },
    };
    await this._client.send(new PutCommand(params));
  }

  protected async searchByCriteria<D>(criteria: Criteria): Promise<D[]> {
    const query = this.criteriaConverter.convert(criteria);
    const params = {
      TableName: this.tableName(),
      FilterExpression: query.filterExpression,
      ExpressionAttributeValues: query.expressionAttributeValues,
      Limit: query.limit,
    };
    const result = await this._client.send(new ScanCommand(params));

    return result.Items as D[];
  }

  protected getClient(): DynamoDBDocumentClient {
    return this._client;
  }
}
