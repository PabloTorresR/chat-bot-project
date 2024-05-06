import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

export class DomainEventFailoverPublisher {
  private tableName: string;

  constructor(private client: Promise<DynamoDBClient>, private deserializer?: DomainEventDeserializer) {
    const env = this.getEnv();
    this.tableName = env === 'prod' ? 'domain-events-table' : `domain-events-table-${env}`;
  }

  setDeserializer(deserializer: DomainEventDeserializer) {
    this.deserializer = deserializer;
  }

  protected getEnv(): string {
    return process.env.NODE_ENV || '';
  }

  async publish(eventId, serializedEvent): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        eventId: { S: eventId },
        event: { S: serializedEvent },
      },
    };

    await (await this.client).send(new PutItemCommand(params));
  }

  async consume(): Promise<Array<DomainEvent>> {
    const params = {
      TableName: this.tableName,
      Limit: 10,
    };

    const { Items } = await (await this.client).send(new ScanCommand(params));

    if (!this.deserializer) {
      throw new Error('Deserializer has not been set yet');
    }

    const events = Items?.map(item => this.deserializer!.deserialize(item.event.S ?? ''));

    return events?.filter(Boolean) as Array<DomainEvent>;
  }
}
