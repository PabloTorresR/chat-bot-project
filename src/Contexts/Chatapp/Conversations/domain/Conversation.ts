import { ConversationCreatedDomainEvent } from './ConversationCreatedDomainEvent';
import { ConversationId } from '../../Shared/domain/ConversationId';
import { ConversationTitle } from './ConversationTitle';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../..//Chatapp/Shared/domain/UserId';

export class Conversation extends AggregateRoot {
  readonly id: ConversationId;
  readonly title: ConversationTitle;
  readonly userId: UserId;

  constructor(id: ConversationId, title: ConversationTitle, userId: UserId) {
    super();
    this.id = id;
    this.title = title;
    this.userId = userId;
  }

  static create(id: ConversationId, title: ConversationTitle, userId: UserId): Conversation {
    const conversation = new Conversation(id, title, userId);

    conversation.record(
      new ConversationCreatedDomainEvent({
        aggregateId: conversation.id.value,
        title: conversation.title.value,
        userId: conversation.userId.value,
      }),
    );

    return conversation;
  }
  static fromPrimitives(plainData: { id: string; title: string; userId: string }): Conversation {
    return new Conversation(
      new ConversationId(plainData.id),
      new ConversationTitle(plainData.title),
      new UserId(plainData.userId),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      userId: this.userId.value,
    };
  }
}
