import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';

export class AwsEventBridgeEventBus implements EventBus {
  private readonly client = new EventBridgeClient({
    region: this.region,
  });

  private readonly eventBusName = 'chatapp.domain_events';
  private readonly projectName = 'chatapp';

  constructor(private readonly failover: DomainEventFailoverPublisher, private readonly region: string) {}

  async publish(events: DomainEvent[]): Promise<void> {
    const promises = events.map(async event => {
      const serializedEvent = DomainEventJsonSerializer.serialize(event);

      await this.publishRaw(event.eventId, event.eventName, serializedEvent);
    });

    await Promise.all(promises);
  }

  async publishFromFailover(): Promise<void> {
    const events = await this.failover.consume();

    await Promise.all(
      events.map(event => this.publishRaw(event.eventId, event.eventName, DomainEventJsonSerializer.serialize(event))),
    );
  }

  private async publishRaw(eventId: string, eventName: string, serializedEvent: string) {
    try {
      return await this.client.send(
        new PutEventsCommand({
          Entries: [
            {
              EventBusName: this.eventBusName,
              Detail: serializedEvent,
              DetailType: eventName,
              Source: this.projectName,
            },
          ],
        }),
      );
    } catch (error: unknown) {
      console.log(error);
      console.log('---------------------------------------------');

      return this.failover.publish(eventId, serializedEvent);
    }
  }
}
