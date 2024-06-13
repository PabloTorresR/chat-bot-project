import AwsEventBridgeConfig from 'shared-context/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeConfig';
import { DomainEventFailoverPublisher } from 'shared-context/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { AwsEventBridgeEventBus } from 'shared-context/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeEventBus';

export class AwsEventBridgeEventBusFactory {
  static create(config: AwsEventBridgeConfig, failoverPublisher: DomainEventFailoverPublisher): AwsEventBridgeEventBus {
    return new AwsEventBridgeEventBus(failoverPublisher, config.region);
  }
}
