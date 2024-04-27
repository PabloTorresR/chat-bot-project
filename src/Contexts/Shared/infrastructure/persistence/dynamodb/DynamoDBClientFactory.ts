import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class DynamoDBClientFactory {
  private static clients: { [key: string]: DynamoDBDocumentClient } = {};

  static createClient(contextName: string, config: DynamoDBClientConfig): DynamoDBDocumentClient {
    let client = DynamoDBClientFactory.getClient(contextName);

    if (!client) {
      client = DynamoDBClientFactory.createAndConnectClient(config);

      DynamoDBClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): DynamoDBDocumentClient | null {
    return DynamoDBClientFactory.clients[contextName];
  }

  private static createAndConnectClient(config: DynamoDBClientConfig): DynamoDBDocumentClient {
    const client = new DynamoDB(config);
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    return ddbDocClient;
  }

  private static registerClient(client: DynamoDBDocumentClient, contextName: string): void {
    DynamoDBClientFactory.clients[contextName] = client;
  }
}
