import { AggregateRoot } from '@/Contexts/Shared/domain/AggregateRoot';
import { MessageId } from '../../Shared/domain/MessageId';
import { MessageContent } from './MessageContent';
import { MessageCreatedDomainEvent } from './MessageCreatedDomainEvent';

export class Message extends AggregateRoot {
  readonly id: MessageId;
  readonly content: MessageContent;

  constructor(id: MessageId, content: MessageContent) {
    super();
    this.id = id;
    this.content = content;
  }

  static create(id: MessageId, content: MessageContent): Message {
    const message = new Message(id, content);

    message.record(
      new MessageCreatedDomainEvent({
        aggregateId: message.id.value,
        content: message.content.value,
      }),
    );

    return message;
  }
  static fromPrimitives(plainData: { id: string; content: string; duration: string }): Message {
    return new Message(new MessageId(plainData.id), new MessageContent(plainData.content));
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      content: this.content.value,
    };
  }
}
