import { MongoRepository } from 'shared-context/infrastructure/persistence/mongo/MongoRepository';
import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { MessageRepository } from '../../../domain/MessageRepository';
import { Message } from '../../../domain/Message';

interface MessageDocument extends Document {
  _id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
  sender: string;
}

export class MongoMessageRepository extends MongoRepository<Message> implements MessageRepository {
  public save(message: Message): Promise<void> {
    return this.persist(message.id.value, message);
  }

  protected collectionName(): string {
    return 'messages';
  }
  protected dbName(): string {
    return 'local';
  }

  public async searchAll(): Promise<Message[]> {
    const collection = await this.collection();
    const documents = await collection.find<MessageDocument>({}, {}).toArray();

    return documents.map(document =>
      Message.fromPrimitives({
        id: document._id,
        content: document.content,
        conversationId: document.conversationId,
        userId: document.userId,
        createdAt: document.createdAt,
        sender: document.sender,
      }),
    );
  }

  public async matching(criteria: Criteria): Promise<Message[]> {
    const documents = await this.searchByCriteria<MessageDocument>(criteria);

    return documents.map(document =>
      Message.fromPrimitives({
        id: document._id,
        content: document.content,
        conversationId: document.conversationId,
        userId: document.userId,
        createdAt: document.createdAt,
        sender: document.sender,
      }),
    );
  }
}
