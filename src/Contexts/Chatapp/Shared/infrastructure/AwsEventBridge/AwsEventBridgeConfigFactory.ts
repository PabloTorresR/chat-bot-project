import AwsEventBridgeConfig from 'shared-context/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeConfig';
import config from '../config';

export class AwsEventBridgeConfigFactory {
  static createConfig(): AwsEventBridgeConfig {
    return config.get('awsEventBridge');
  }
}
