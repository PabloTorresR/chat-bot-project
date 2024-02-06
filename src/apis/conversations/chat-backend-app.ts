// import { EventBus } from "../../../Contexts/Shared/domain/EventBus";
// import container from "./dependency-injection";
// import { DomainEventSubscribers } from "../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";
import { Server } from './server';
// import { RabbitMqConnection } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection";

export class ChatBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    this.server = new Server(port);

    //TODO: add event bus
    // await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    //TODO: add event bus
    // const rabbitMQConnection = container.get<RabbitMqConnection>(
    //   "Mooc.Shared.RabbitMQConnection"
    // );
    // await rabbitMQConnection.close();
    return this.server?.stop();
  }

  //TODO: add event bus
  //   private async configureEventBus() {
  //     const eventBus = container.get<EventBus>("Mooc.Shared.domain.EventBus");
  //     const rabbitMQConnection = container.get<RabbitMqConnection>(
  //       "Mooc.Shared.RabbitMQConnection"
  //     );
  //     await rabbitMQConnection.connect();

  //     eventBus.addSubscribers(DomainEventSubscribers.from(container));
  //   }
}
