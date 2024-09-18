import { AwsRequestSigner } from 'shared-context/infrastructure/Aws/AwsRequestSigner';
import { Module } from '@nestjs/common';

const providers = [
  {
    provide: 'AwsRequestSigner',
    useClass: AwsRequestSigner,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class AwsModule {}
