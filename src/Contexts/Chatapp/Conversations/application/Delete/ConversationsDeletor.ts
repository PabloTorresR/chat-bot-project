import { ConversationId } from '../../../Shared/domain/ConversationId';
import { ConversationRepository } from '../../domain/ConversationRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConversationsDeletor {
  constructor(@Inject('ConversationRepository') private repository: ConversationRepository) {}
  async run(params: { id: ConversationId }): Promise<void> {
    await this.repository.deleteById(params.id);
  }
}
