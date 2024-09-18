import { ConversationId } from '../../../Shared/domain/ConversationId';
import { MessageRepository } from '../../domain/MessageRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MessagesDeletor {
  constructor(@Inject('MessageRepository') private repository: MessageRepository) {}
  async run(params: { conversationId: ConversationId }): Promise<void> {
    await this.repository.deleteByConversationId(params.conversationId);
  }
}
