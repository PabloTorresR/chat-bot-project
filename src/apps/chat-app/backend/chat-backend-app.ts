import container from './dependency-injection-awilix';
import { Server } from './server';

export class ChatBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    await container.resolve('dynamoDBConfig').getCredentials();
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
