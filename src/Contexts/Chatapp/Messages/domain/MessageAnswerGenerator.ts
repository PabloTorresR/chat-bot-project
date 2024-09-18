export interface MessageAnswerGenerator {
  generate(body: unknown): Promise<{ response: string; [key: string]: unknown }>;
}
