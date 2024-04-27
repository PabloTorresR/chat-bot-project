import { DynamoDBClientFactory } from '../../../infrastructure/persistence/dynamodb/DynamoDBClientFactory';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION;

describe('DynamoDBClientFactory', () => {
  const factory = DynamoDBClientFactory;
  let client: DynamoDBDocumentClient;

  beforeEach(async () => {
    client = factory.createClient('test', { region });
  });

  afterEach(async () => {
    // Clean up resources
  });

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(DynamoDBDocumentClient);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = factory.createClient('test2', { region });

    expect(newClient).not.toBe(client);
  });

  it('returns a client if it already exists', async () => {
    const newClient = factory.createClient('test', { region });

    expect(newClient).toBe(client);
  });
});
