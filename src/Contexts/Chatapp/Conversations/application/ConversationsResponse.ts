import { Conversation } from '../domain/Conversation';

interface ConversationResponse {
  id: string;
  title: string;
}

export class ConversationsResponse {
  public readonly courses: ConversationResponse[];

  constructor(courses: Conversation[]) {
    this.courses = courses.map(course => course.toPrimitives());
  }
}
