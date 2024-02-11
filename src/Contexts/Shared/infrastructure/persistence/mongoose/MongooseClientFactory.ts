import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import MongoConfig from '../mongo/MongoConfig';

export class MongooseClientFactory {
  private static clients: { [key: string]: Mongoose } = {};

  static async createClient(contextName: string, config: MongoConfig): Promise<Mongoose> {
    let client = MongooseClientFactory.getClient(contextName);

    if (!client) {
      client = await MongooseClientFactory.createAndConnectClient(config);

      MongooseClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Mongoose | null {
    return MongooseClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<Mongoose> {
    const options: ConnectOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // ignoreUndefined: true,
    };

    try {
      return await mongoose.connect(config.url, options);
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }

  private static registerClient(client: Mongoose, contextName: string): void {
    MongooseClientFactory.clients[contextName] = client;
  }
}
