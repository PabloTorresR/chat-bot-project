import AwsEventBridgeConfig from 'Contexts/Shared/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeConfig';
import { DomainEventFailoverPublisher } from '../../../..//Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { AwsEventBridgeEventBus } from '../../../../Shared/infrastructure/EventBus/AwsEventBridge/AwsEventBridgeEventBus';

export class AwsEventBridgeEventBusFactory {
  static create(config: AwsEventBridgeConfig, failoverPublisher: DomainEventFailoverPublisher): AwsEventBridgeEventBus {
    return new AwsEventBridgeEventBus(failoverPublisher, config.region);
  }
}
