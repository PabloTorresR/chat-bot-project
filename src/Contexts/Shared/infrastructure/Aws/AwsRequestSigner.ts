import { HttpRequest } from '@aws-sdk/protocol-http';
import { Injectable } from '@nestjs/common';
import { SignatureV4, Sha256 } from 'aws-sdk/lib/signers/v4';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

@Injectable()
export class AwsRequestSigner {
  private getCredentials() {
    return defaultProvider();
  }
  async getSignedRequest(url: string, body: unknown): Promise<HttpRequest> {
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
}
