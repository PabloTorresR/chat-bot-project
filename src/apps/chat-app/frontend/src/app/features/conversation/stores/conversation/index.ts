import { create } from 'zustand';
import { Message } from '../../types/message';
import { Conversation } from '../../types/conversation';
import { MessageSender } from '../../enums/message-sender';

const messages: Message[] = [
  {
    id: '2',
    sender: MessageSender.USER,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    sender: MessageSender.USER,
    content: 'Adios',
    timestamp: new Date().toISOString(),
  },
];

type ConversationStore = {
  conversation?: Conversation | null;
  messages?: Message[];
  setConversation: (conversation?: Conversation) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: { id: '1', title: 'Conversation 1' },
  messages,
  setConversation: conversation => set({ conversation }),
  setMessages: messages => set({ messages }),
  addMessage: message =>
    set(state => ({
      ...state,
      messages: state.messages ? [...state.messages, message] : [message],
    })),
}));

export default useConversationStore;
