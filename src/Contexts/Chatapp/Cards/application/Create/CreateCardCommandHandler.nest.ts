import { CardId } from '../../../Shared/domain/CardId';
import { CreateCardCommand } from '../../domain/CreateCardCommand';
import { UserId } from '../../../Shared/domain/UserId';
import {
  CardExamples,
  CardDifficulty,
  CardIsLearned,
  CardLanguage,
  CardNativeLanguage,
  CardNativeWord,
  CardWord,
  CardCreatedAt,
  CardTopics,
} from '../../domain/CardDomainValueObjects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CardCreator } from './CardCreator.nest';

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler implements ICommandHandler<CreateCardCommand> {
  constructor(@Inject('CardCreator') private cardCreator: CardCreator) {}
  async execute(command: CreateCardCommand): Promise<void> {
    const id = new CardId(command.id);
    const userId = new UserId(command.userId);
    const createdAt = CardCreatedAt.createFromString(command.createdAt);

    const word = new CardWord(command.word);
    const nativeWord = new CardNativeWord(command.nativeWord);
    const language = new CardLanguage(command.language);
    const nativeLanguage = new CardNativeLanguage(command.nativeLanguage);
    const examples = new CardExamples(command.examples);
    const difficulty = new CardDifficulty(command.difficulty);
    const isLearned = new CardIsLearned(command.isLearned);
    const topics = new CardTopics(command.topics);

    await this.cardCreator.run({
      id,
      word,
      nativeWord,
      language,
      nativeLanguage,
      examples,
      difficulty,
      isLearned,
      createdAt,
      userId,
      topics,
    });
  }
}
