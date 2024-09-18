export interface ConversationTitleGenerator {
    generate(body: unknown): Promise<string>;
  }
  