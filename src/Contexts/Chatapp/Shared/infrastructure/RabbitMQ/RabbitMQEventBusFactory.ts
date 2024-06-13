import { DomainEventFailoverPublisher } from 'shared-context/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMqConnection } from 'shared-context/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from 'shared-context/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus';
import { RabbitMQqueueFormatter } from 'shared-context/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMQConfig } from './RabbitMQConfigFactory';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig,
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries,
    });
  }
}
