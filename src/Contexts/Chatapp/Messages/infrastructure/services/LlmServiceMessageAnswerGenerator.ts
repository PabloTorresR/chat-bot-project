import { HttpRequest } from '@aws-sdk/protocol-http';
import { PostAnswerMessageRequest, PostAnswerMessageResponse } from 'dtos-lib/llm-service/messages';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import axios from 'axios';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Sha256 } from '@aws-crypto/sha256-js';

export class LlmServiceMessageAnswerGenerator implements MessageAnswerGenerator {
  private getAnswerMessageUrl(): string {
    const url = process.env.LLM_SERVICE_URL;
    return `${url}/message/answer`;
  }

  private getCredentials() {
    return defaultProvider();
  }

  private async getSignedRequest(url: string, body: PostAnswerMessageRequest): Promise<HttpRequest> {
    const apiUrl = new URL(url);
    const signer = new SignatureV4({
      service: 'execute-api',
      region: 'eu-central-1',
      credentials: this.getCredentials(),
      sha256: Sha256,
    });

    return signer.sign({
      method: 'POST',
      hostname: apiUrl.host,
      path: apiUrl.pathname,
      protocol: apiUrl.protocol,
      headers: {
        'Content-Type': 'application/json',
        host: apiUrl.hostname, // compulsory
      },
      body: JSON.stringify(body),
    }) as Promise<HttpRequest>;
  }

  private async sendRequest(url: string, body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const signedRequest = await this.getSignedRequest(url, body);
    console.log('signedRequest', signedRequest);
    const response = await axios.request({
      ...signedRequest,
      url,
      data: body,
    });
    return response.data;
  }

  async generate(body: PostAnswerMessageRequest): Promise<PostAnswerMessageResponse> {
    const url = this.getAnswerMessageUrl();
    try {
      return await this.sendRequest(url, body);
    } catch (e) {
      throw new Error(`Failed to send message to ${url}: ${e.message}`);
    }
  }
}
