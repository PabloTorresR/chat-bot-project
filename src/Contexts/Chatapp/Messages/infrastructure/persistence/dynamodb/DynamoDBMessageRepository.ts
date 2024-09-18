import { Criteria } from 'shared-context/domain/criteria/Criteria';
import { MessageRepository } from '../../../domain/MessageRepository';
import { Message } from '../../../domain/Message';
import { DynamoDBRepository } from 'shared-context/infrastructure/persistence/dynamodb/DynamoDBRepository';
import { DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConversationId } from '../../../../Shared/domain/ConversationId';

interface MessageDocument extends Document {
  _id: string;
  content: string;
  conversationId: string;
  userId: string;
  createdAt: string;
  sender: string;
}
@Injectable()
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
          id: document._id,
          content: document.content,
          conversationId: document.conversationId,
          userId: document.userId,
          createdAt: document.createdAt,
          sender: document.sender,
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

  public async deleteByConversationId(conversationId: ConversationId): Promise<void> {
    const client = this.getClient();
    const table = this.tableName();
    const ids = await client.send(
      new ScanCommand({
        TableName: table,
        ProjectionExpression: 'id',
        FilterExpression: 'conversationId = :conversationId',
        ExpressionAttributeValues: { ':conversationId': conversationId.value },
      }),
    );
    for (const id of ids.Items) {
      await client.send(
        new DeleteCommand({
          TableName: table,
          Key: {
            _id: id.id,
          },
        }),
      );
    }
  }
}
