import { fromIni } from '@aws-sdk/credential-providers';
import DynamoDBConfig from '../../../../../Shared/infrastructure/persistence/dynamodb/DynamoDBConfig';
import config from '../../config';

export class DynamoConfigFactory {
  protected static async getCredentials() {
    return fromIni({ profile: '975050254610_AdministratorAccess' })();
  }
  static async createConfig(): Promise<DynamoDBConfig> {
    const credentials = await this.getCredentials();
    return { ...config.get('dynamodb'), credentials };
  }
}
