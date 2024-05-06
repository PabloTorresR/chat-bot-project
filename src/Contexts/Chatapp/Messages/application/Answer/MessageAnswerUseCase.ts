import { CommandBus } from '../../../../Shared/domain/CommandBus';
import { MessageAnswerGenerator } from '../../domain/MessageAnswerGenerator';
import { CreateMessageCommand } from '../../domain/CreateMessageCommand';
import { PostMessagesRequest, PostMessagesResponse } from 'libs/dtos/chatapp/messages';
import { v4 as uuidv4 } from 'uuid';

export class MessageAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly messageAnswerGenerator: MessageAnswerGenerator,
  ) {}

  private async createUserMessage(message: PostMessagesRequest['message']) {
    const createMessageCommand = new CreateMessageCommand({
      id: message.id,
      content: message.content,
      conversationId: message.conversationId,
      userId: message.userId,
      createdAt: message.createdAt,
      sender: message.sender,
    });
    await this.commandBus.dispatch(createMessageCommand);
  }

  private async createBotMessage(userMessage: PostMessagesRequest['message'], content: string) {
    const createMessageCommand = new CreateMessageCommand({
      id: uuidv4(),
      content: content,
      conversationId: userMessage.conversationId,
      userId: userMessage.userId,
      createdAt: new Date().toISOString(),
      sender: 'bot',
    });
    await this.commandBus.dispatch(createMessageCommand);
    return createMessageCommand;
  }

  async run(body: PostMessagesRequest): Promise<PostMessagesResponse> {
    const chatbotMessageString = await this.messageAnswerGenerator.generate(body);
    const [, chatbotMessage] = await Promise.all([
      this.createUserMessage(body.message),
      this.createBotMessage(body.message, chatbotMessageString),
    ]);
    return chatbotMessage;
  }
}
