// import { Uuid } from './../../../../Shared/domain/value-object/Uuid';
// import { DynamoDBMessageRepository } from './../../../../../Contexts/Chatapp/Messages/infrastructure/persistence/dynamodb/DynamoDBMessageRepository';
// import { DynamoDBClientFactory } from './../../../../../Contexts/Shared/infrastructure/persistence/dynamodb/DynamoDBClientFactory';
// import { DynamoDBConfigFactory } from '../../../Shared/infrastructure/persistence/dynamodb/DynamoDBConfigFactory';
// import { Message } from './../../../../../Contexts/Chatapp/Messages/domain/Message';
// import { MessageId } from './../../../../../Contexts/Chatapp/Shared/domain/MessageId';
// import { MessageContent } from './../../../../../Contexts/Chatapp/Messages/domain/MessageContent';
// import { ConversationId } from './../../../../../Contexts/Chatapp/Shared/domain/ConversationId';
// import { UserId } from './../../../../../Contexts/Chatapp/Shared/domain/UserId';
// import { MessageSender } from './../../../../../Contexts/Chatapp/Messages/domain/MessageSender';
// import { MessageCreatedAt } from './../../../../../Contexts/Chatapp/Messages/domain/MessageCreatedAt';
// import { MessageSenderValues } from './../../../../../Contexts/Chatapp/Messages/domain/MessageSenderValues';

// const randomMessage = (): Message => {
//   const id = new MessageId(Uuid.random().value);
//   const content = new MessageContent('This is a random message');
//   const conversationId = new ConversationId(Uuid.random().value);
//   const userId = new UserId(Uuid.random().value);
//   const createdAt = MessageCreatedAt.createFromString('2021-01-01T00:00:00.000Z');
//   const sender = new MessageSender(MessageSenderValues.USER);

//   return Message.create(id, content, conversationId, userId, createdAt, sender);
// };

// const message = randomMessage();
// beforeEach(async () => {
//   //   await (await environmentArranger).arrange();
// });

// afterAll(async () => {
//   //   await (await environmentArranger).arrange();
//   //   await (await environmentArranger).close();
// });

// describe('MessagesCounterRepository', () => {
//   describe('#save', () => {
//     it('should save a messages counter', async () => {
//       const config = await DynamoDBConfigFactory.createConfig();

//       const dbClient = DynamoDBClientFactory.createClient('chatapp', config);
//       const repository = new DynamoDBMessageRepository(dbClient);
//       await repository.save(message);
//     });
//   });

//   describe('#search', () => {
//     it('should return an existing message', async () => {
//       // const expectedCounter = await repository.save(expectedCounter);
//       const config = await DynamoDBConfigFactory.createConfig();

//       const dbClient = DynamoDBClientFactory.createClient('chatapp', config);
//       const repository = new DynamoDBMessageRepository(dbClient);
//       const all = await repository.searchAll();

//       expect(all).toBeDefined();
//     });
//   });
// });
