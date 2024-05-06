export interface MessageAnswerGenerator {
  generate(body: unknown): Promise<string>;
}
