import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../Shared/domain/ConversationId';
import { ConversationRepository } from '../../domain/ConversationRepository';
import { ConversationTitleGenerator } from '../../domain/ConversationTitleGenerator';

@Injectable()
export class ConversationTitleUpdater {
  constructor(@Inject("ConversationRepository") private repository: ConversationRepository, @Inject("ConversationTitleGenerator") private conversationTitleGenerator: ConversationTitleGenerator) {}

  async run(params: { id: ConversationId }): Promise<void> {
    const title = await this.conversationTitleGenerator.generate(params.id.value);
    await this.repository.updateTitle(params.id.value, title);
  }
}
