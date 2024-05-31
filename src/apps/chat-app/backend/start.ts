import { ChatBackendApp } from './chat-backend-app';
import dotenv from 'dotenv';
import { proxy } from 'aws-serverless-express'
import { APIGatewayProxyHandler } from 'aws-lambda';

dotenv.config();

const app = new ChatBackendApp();

try {
  app.start();
} catch (e) {
  console.log(e);
  process.exit(1);
}


process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});

export const handler: APIGatewayProxyHandler = (event, context) => {
  if(!app.server) {
    throw new Error('Server is not running');
  }
  return proxy(app.server?.getServer(), event, context, 'PROMISE').promise
}