import { PostAnswerMessageRequest, PostAnswerMessageResponse } from 'dtos-lib/llm-service/messages';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import axios from 'axios';

export class LlmServiceMessageAnswerGenerator implements MessageAnswerGenerator {
  private getAnswerMessageurl(): string {
    const url = process.env.LLM_SERVICE_URL;
    return `${url}/message/answer`;
  }

  async generate(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const url = this.getAnswerMessageurl();
    try {
      return (await axios.post(url, body)).data;
    } catch (e) {
      throw new Error(`Failed to send message to, ${url} with body, ${(body.message, e.message)}`);
    }
  }
}
