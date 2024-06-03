import { PostAnswerMessageRequest, PostAnswerMessageResponse } from 'dtos-lib/llm-service/messages';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import axios from 'axios';

export class LlmServiceMessageAnswerGenerator implements MessageAnswerGenerator {
  constructor(private readonly LLM_SERVICE_URL: string) {}

  private getAnswerMessageurl(): string {
    const url = process.env.LLM_SERVICE_URL;
    return `${url}/message/answer`;
  }

  async generate(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    // if (!this.LLM_SERVICE_URL) {
    //   throw new Error('LLM_SERVICE_URL is not defined');
    // }
    const url = this.getAnswerMessageurl();
    try {
      return (await axios.post(url, body)).data;
    } catch (e) {
      throw new Error(`Failed to send message to, ${url} with body, ${(body.message, body.messageHistory)}`);
    }
  }
}
