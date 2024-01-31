import { create } from 'zustand';
import { Message } from '../../types/message';
import { Conversation } from '../../types/conversation';
import { MessageSender } from '../../enums/message-sender';

const messages: Message[] = [
  {
    id: '2',
    sender: MessageSender.USER,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.USER,
    content: 'Adios',
  },
];

type ConversationStore = {
  conversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
  addMessage: (message: Message) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: { messages: messages, id: '1' },
  setConversation: conversation => set({ conversation }),
  addMessage: message =>
    set(state => ({
      conversation: state.conversation
        ? {
            ...state.conversation,
            messages: [...state.conversation.messages, message],
          }
        : null,
    })),
}));

export default useConversationStore;
