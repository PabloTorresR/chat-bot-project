import { EventBus } from 'shared-context/domain/EventBus';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { Conversation } from '../../domain/Conversation';
import { ConversationTitle } from '../../domain/ConversationTitle';
import { ConversationRepository } from '../../domain/ConversationRepository';
import { UserId } from '../../../Shared/domain/UserId';

export class ConversationCreator {
  constructor(private repository: ConversationRepository, private eventBus: EventBus) {}

  async run(params: { id: ConversationId; title: ConversationTitle; userId: UserId }): Promise<void> {
    const conversation = Conversation.create(params.id, params.title, params.userId);
    await this.repository.save(conversation);
    await this.eventBus.publish(conversation.pullDomainEvents());
  }
}
