import AwsEventBridgeConfig from '../../../../Shared/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeConfig';
import config from '../config';

export class AwsEventBridgeConfigFactory {
  static createConfig(): AwsEventBridgeConfig {
    return config.get('awsEventBridge');
  }
}
