import { PostAnswerMessageRequest, PostAnswerMessageResponse } from 'libs/dtos/llm-service/messages';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import axios from 'axios';

export class LlmServiceMessageAnswerGenerator implements MessageAnswerGenerator {
  constructor(private readonly LLM_SERVICE_URL: string) {}

  private getAnswerMessageurl(): string {
    return `${this.LLM_SERVICE_URL}/message/answer`;
  }

  async generate(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const url = this.getAnswerMessageurl();
    if (!url) {
      throw new Error('LLM_SERVICE_URL is not defined');
    }
    try {
      return await axios.post(url, body);
    } catch (e) {
      throw new Error(`Failed to send message to, ${url} with body, ${(body.message, body.messageHistory)}`);
    }
  }
}
