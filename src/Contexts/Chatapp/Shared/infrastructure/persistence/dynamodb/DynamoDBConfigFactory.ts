import { fromEnv } from '@aws-sdk/credential-providers';
import DynamoDBConfig from '../../../../../Shared/infrastructure/persistence/dynamodb/DynamoDBConfig';
import config from '../../config';

export class DynamoDBConfigFactory {
  private static credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  } = {
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
  };

  static async getCredentials() {
    console.log('Getting credentials');
    this.credentials = await fromEnv()();
  }

  static async createConfig(): Promise<DynamoDBConfig> {
    console.log('Creating config');
    return { ...config.get('dynamodb'), credentials: this.credentials };
  }
}
