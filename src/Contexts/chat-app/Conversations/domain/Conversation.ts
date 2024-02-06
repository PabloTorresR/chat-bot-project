import { AggregateRoot } from '@/Contexts/Shared/domain/AggregateRoot';
import { ConversationId } from '../../Shared/domain/ConversationId';
import { ConversationCreatedDomainEvent } from './ConversationCreatedDomainEvent';
import { ConversationTitle } from './ConversationTitle';

export class Conversation extends AggregateRoot {
  readonly id: ConversationId;
  readonly title: ConversationTitle;

  constructor(id: ConversationId, title: ConversationTitle) {
    super();
    this.id = id;
    this.title = title;
  }

  static create(id: ConversationId, title: ConversationTitle): Conversation {
    const conversation = new Conversation(id, title);

    conversation.record(
      new ConversationCreatedDomainEvent({
        aggregateId: conversation.id.value,
        title: conversation.title.value,
      }),
    );

    return conversation;
  }
  static fromPrimitives(plainData: { id: string; title: string; duration: string }): Conversation {
    return new Conversation(new ConversationId(plainData.id), new ConversationTitle(plainData.title));
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
    };
  }
}
