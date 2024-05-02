import { fromEnv } from '@aws-sdk/credential-providers';
import DynamoDBConfig from '../../../../../Shared/infrastructure/persistence/dynamodb/DynamoDBConfig';
import config from '../../config';

export class DynamoDBConfigFactory {
  protected static async getCredentials() {
    return fromEnv()();
  }

  static async createConfig(): Promise<DynamoDBConfig> {
    const credentials = await this.getCredentials();
    return { ...config.get('dynamodb'), credentials };
  }
}
