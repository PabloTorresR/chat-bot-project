import { AwsRequestSigner } from 'shared-context/infrastructure/Aws/AwsRequestSigner';
import { PostAnswerMessageRequest, PostAnswerMessageResponse } from 'dtos-lib/llm-service/messages';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmServiceMessageAnswerGenerator implements MessageAnswerGenerator {
  constructor(@Inject('AwsRequestSigner') private readonly awsRequestSigner: AwsRequestSigner) {}
  private getAnswerMessageUrl(): string {
    const url = process.env.LLM_SERVICE_URL;
    return `${url}/message/answer`;
  }

  private async generateSigned(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const url = this.getAnswerMessageUrl();
    try {
      return await this.sendSignedRequest<PostAnswerMessageResponse>(url, body);
    } catch (e) {
      throw new Error(`Failed to send message to ${url}: ${e.message}`);
    }
  }

  private async sendSignedRequest<R>(url: string, body: unknown): Promise<R> {
    const signedRequest = await this.awsRequestSigner.getSignedRequest(url, body);
    const response = await axios.request({
      ...signedRequest,
      url,
      data: body,
    });
    return response.data;
  }

  private async generateUnsigned(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const url = this.getAnswerMessageUrl();
    try {
      return (await axios.post(url, body)).data;
    } catch (e) {
      throw new Error(`Failed to send message to, ${url} with body, ${(body.message, e.message)}`);
    }
  }

  async generate(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    if (process.env.DEPLOYMENT_MODE === 'local') {
      return this.generateUnsigned(body);
    } else {
      return this.generateSigned(body);
    }
  }
}
