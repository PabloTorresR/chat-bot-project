import { NumberValueObject } from 'shared-context/domain/value-object/IntValueObject';
import { BooleanValueObject } from 'shared-context/domain/value-object/BooleanValueObject';
import { InvalidArgumentError } from 'shared-context/domain/value-object/InvalidArgumentError';
import { StringValueObject } from 'shared-context/domain/value-object/StringValueObject';
import { DateValueObject } from 'shared-context/domain/value-object/DateValueObject';

export class CardCreatedAt extends DateValueObject {
  static createFromString(dateString: string): CardCreatedAt {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new InvalidArgumentError('Invalid date string');
    }
    return new CardCreatedAt(date);
  }
  toString(): string {
    return this.value.toISOString();
  }
}

export class CardStringValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan50Characters(value);
  }

  private ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50) {
      throw new InvalidArgumentError(`The Card content <${value}> has more than 50 characters`);
    }
  }
}

export class CardDifficulty extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureIsBetween1and5(value);
  }

  private ensureIsBetween1and5(value: number): void {
    if (value < 1 || value > 5) {
      throw new InvalidArgumentError(`The difficulty <${value}> has to be between 1 and 5`);
    }
  }
}

export class CardExamples {
  private readonly example: string;
  private readonly nativeExample: string;
  private readonly movieExample: string;
  private readonly nativeMovieExample: string;

  constructor({
    example,
    nativeExample,
    movieExample,
    nativeMovieExample,
  }: {
    example?: string;
    nativeExample?: string;
    movieExample?: string;
    nativeMovieExample?: string;
  }) {
    this.example = example ?? '';
    this.nativeExample = nativeExample ?? '';
    this.movieExample = movieExample ?? '';
    this.nativeMovieExample = nativeMovieExample ?? '';
    this.ensureLengthIsLessThan300Characters(this.example);
    this.ensureLengthIsLessThan300Characters(this.nativeExample);
    this.ensureLengthIsLessThan300Characters(this.movieExample);
    this.ensureLengthIsLessThan300Characters(this.nativeMovieExample);
  }

  private ensureLengthIsLessThan300Characters(value: string): void {
    if (value.length > 300) {
      throw new InvalidArgumentError(`The Card content <${value}> has more than 300 characters`);
    }
  }
  toPrimitives() {
    return {
      example: this.example,
      nativeExample: this.nativeExample,
      movieExample: this.movieExample,
      nativeMovieExample: this.nativeMovieExample,
    };
  }
}

export class CardWord extends CardStringValueObject {}
export class CardNativeWord extends CardStringValueObject {}
export class CardLanguage extends CardStringValueObject {}
export class CardNativeLanguage extends CardStringValueObject {}
export class CardIsLearned extends BooleanValueObject {}
export class CardTopics {
  value: string[];
  constructor(value: string[]) {
    this.value = value;
    this.ensureTopicsAreValid(value);
  }
  ensureTopicsAreValid(value: string[]): void {
    if (value.length === 0) {
      throw new InvalidArgumentError('Topics must be defined');
    }
  }
  toString(): string {
    return this.value.join(', ');
  }
}
