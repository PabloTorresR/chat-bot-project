import { ConversationCreatedDomainEvent } from './ConversationCreatedDomainEvent';
import { ConversationId } from '../../Shared/domain/ConversationId';
import { ConversationTitle } from './ConversationTitle';
import { AggregateRoot } from 'shared-context/domain/AggregateRoot';
import { UserId } from '../../Shared/domain/UserId';
import { ConversationMessageCounter } from './ConversationMessageCounter';
import { ConversationCreatedAt } from './ConversationCreatedAt';

export class Conversation extends AggregateRoot {
  readonly id: ConversationId;
  readonly title: ConversationTitle;
  readonly userId: UserId;
  readonly messageCounter: ConversationMessageCounter;
  readonly createdAt: ConversationCreatedAt;

  constructor(id: ConversationId, title: ConversationTitle, userId: UserId, createdAt: ConversationCreatedAt) {
    super();
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.messageCounter = ConversationMessageCounter.zero();
    this.createdAt = createdAt;
  }

  static create(
    id: ConversationId,
    title: ConversationTitle,
    userId: UserId,
    createdAt: ConversationCreatedAt,
  ): Conversation {
    const conversation = new Conversation(id, title, userId, createdAt);

    conversation.record(
      new ConversationCreatedDomainEvent({
        aggregateId: conversation.id.value,
        title: conversation.title.value,
        userId: conversation.userId.value,
        messageCounter: conversation.messageCounter.value,
        createdAt: conversation.createdAt.toString(),
      }),
    );

    return conversation;
  }
  static fromPrimitives(plainData: { id: string; title: string; userId: string; createdAt: string }): Conversation {
    return new Conversation(
      new ConversationId(plainData.id),
      new ConversationTitle(plainData.title),
      new UserId(plainData.userId),
      ConversationCreatedAt.createFromString(plainData.createdAt),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      userId: this.userId.value,
      messageCounter: this.messageCounter.value,
      createdAt: this.createdAt.toString(),
    };
  }
}
