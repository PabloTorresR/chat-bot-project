import { Criteria } from '../../../../../Shared/domain/criteria/Criteria';
import { MessageRepository } from '../../../domain/MessageRepository';
import { Message } from '../../../domain/Message';
import { DynamoDBRepository } from '../../../../../Shared/infrastructure/persistence/dynamodb/DynamoDBRepository';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

interface MessageDocument extends Document {
  _id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
  sender: string;
}

export class DynamoDBMessageRepository extends DynamoDBRepository<Message> implements MessageRepository {
  public save(message: Message): Promise<void> {
    return this.persist(message.id.value, message);
  }

  protected tableName(): string {
    const env = this.getEnv();
    return env === 'prod' ? 'messages-table' : `messages-table-${env}`;
  }

  public async searchAll(): Promise<Message[]> {
    const table = this.tableName();
    const client = this.getClient();
    const result = await (await client).send(new ScanCommand({ TableName: table }));
    const documents = result.Items;

    return (
      documents?.map(document =>
        Message.fromPrimitives({
          id: document._id?.S ?? '',
          content: document.content?.S ?? '',
          conversationId: document.conversationId?.S ?? '',
          userId: document.userId?.S ?? '',
          createdAt: document.createdAt?.S ?? '',
          sender: document.sender?.S ?? '',
        }),
      ) ?? ([] as Message[])
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
