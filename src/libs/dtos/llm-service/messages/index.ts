export type PostAnswerMessageRequest = {
  message: Message;
  messageHistory: HistoryMessage[];
};

export type PostAnswerMessageResponse = string;

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  conversationId: string;
  userId: string;
}

interface HistoryMessage extends Omit<Message, 'userId' | 'conversationId' | 'id'> {}
