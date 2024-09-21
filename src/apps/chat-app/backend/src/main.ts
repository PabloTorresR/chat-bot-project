import { Callback, Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import serverlessExpress from '@codegenie/serverless-express';
import { ValidationPipe } from '@nestjs/common';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create({ module: AppModule, enableCors: true });
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Authorization, Content-Type, Accept, Origin',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());
  //NOTE: uncomment for local development
  if (process.env.DEPLOYMENT_MODE === 'local') {
    await app.listen(5001);
  }
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
bootstrap();

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
