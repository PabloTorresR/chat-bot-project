import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { Conversation } from '../../domain/Conversation';
import { ConversationTitle } from '../../domain/ConversationTitle';
import { UserId } from '../../../Shared/domain/UserId';
import { EventBus } from '@nestjs/cqrs';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class ConversationCreator {
  constructor(@Inject("ConversationRepository") private repository: ConversationRepository, private eventBus: EventBus) {}

  async run(params: { id: ConversationId; title: ConversationTitle; userId: UserId }): Promise<void> {
    const conversation = Conversation.create(params.id, params.title, params.userId);
    await this.repository.save(conversation);
    await this.eventBus.publish(conversation.pullDomainEvents());
  }
}
