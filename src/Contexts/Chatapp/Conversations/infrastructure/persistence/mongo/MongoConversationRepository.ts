import { MongoRepository } from '../../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Criteria } from '../../../../../Shared/domain/criteria/Criteria';
import { ConversationRepository } from '../../../domain/ConversationRepository';
import { Conversation } from '../../../domain/Conversation';

interface ConversationDocument extends Document {
  id: string;
  title: string;
}

export class MongoConversationRepository extends MongoRepository<Conversation> implements ConversationRepository {
  public save(conversation: Conversation): Promise<void> {
    return this.persist(conversation.id.value, conversation);
  }

  protected collectionName(): string {
    return 'conversations';
  }
  protected dbName(): string {
    return 'local';
  }

  public async searchAll(): Promise<Conversation[]> {
    const collection = await this.collection();
    const documents = await collection.find<ConversationDocument>({}, {}).toArray();

    return documents.map(document => Conversation.fromPrimitives({ title: document.title, id: document.id }));
  }

  public async matching(criteria: Criteria): Promise<Conversation[]> {
    const documents = await this.searchByCriteria<ConversationDocument>(criteria);

    return documents.map(document => Conversation.fromPrimitives({ title: document.title, id: document.id }));
  }
}
