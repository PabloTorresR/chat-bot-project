import { Criteria } from '../../../../../Shared/domain/criteria/Criteria';
import { ConversationRepository } from '../../../domain/ConversationRepository';
import { Conversation } from '../../../domain/Conversation';
import { DynamoDBRepository } from '../../../../../Shared/infrastructure/persistence/dynamodb/DynamoDBRepository';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

interface ConversationDocument {
  _id: string;
  title: string;
  userId: string;
}

export class DynamoDBConversationRepository extends DynamoDBRepository<Conversation> implements ConversationRepository {
  public save(conversation: Conversation): Promise<void> {
    return this.persist(conversation.id.value, conversation);
  }

  protected tableName(): string {
    const env = this.getEnv();
    return env === 'prod' ? 'conversations-table' : `conversations-table-${env}`;
  }

  public async searchAll(): Promise<Conversation[]> {
    const table = this.tableName();
    const client = this.getClient();
    const result = await (await client).send(new ScanCommand({ TableName: table }));
    const documents = result.Items;

    return (
      documents?.map(document =>
        Conversation.fromPrimitives({
          title: document.title?.S ?? '',
          id: document._id?.S ?? '',
          userId: document.userId?.S ?? '',
        }),
      ) ?? ([] as Conversation[])
    );
  }

  public async matching(criteria: Criteria): Promise<Conversation[]> {
    const documents = await this.searchByCriteria<ConversationDocument>(criteria);

    return documents.map(document =>
      Conversation.fromPrimitives({ title: document.title, id: document._id, userId: document.userId }),
    );
  }
}
