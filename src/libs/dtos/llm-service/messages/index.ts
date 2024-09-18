export type PostAnswerMessageRequest = {
  message: Message;
  messageHistory: HistoryMessage[];
  userLanguage: string;
};

export type PostAnswerMessageResponse = { response: string; [key: string]: unknown };

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  conversationId: string;
  userId: string;
}

interface HistoryMessage extends Omit<Message, 'userId' | 'conversationId' | 'id'> {}
