import { create } from 'zustand';
import { Message } from '../../types/message';
import { Conversation } from '../../types/conversation';
import { MessageSender } from '../../enums/message-sender';

const FAKE_MESSAGES: Message[] = [
  {
    id: '2',
    sender: MessageSender.USER,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    conversationId: '1',
    userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    createdAt: new Date().toISOString(),
    conversationId: '1',
    userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'klk manin',
    createdAt: new Date().toISOString(),
    conversationId: '1',
    userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
  },
  {
    id: '3',
    sender: MessageSender.USER,
    content: 'estamo bellako o ke ase',
    createdAt: new Date().toISOString(),
    conversationId: '1',
    userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
  },
  {
    id: '5',
    sender: MessageSender.BOT,
    content: 'Tranquilo, mi hermano, todo bien',
    createdAt: new Date().toISOString(),
    conversationId: '1',
    userId: '2b54f894-78d1-45a7-bbe5-06238f8d5434',
  },
];

type ConversationStore = {
  conversation?: Conversation | null;
  messages?: Message[];
  setConversation: (conversation?: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: null,
  messages: FAKE_MESSAGES,
  setConversation: conversation => set({ conversation }),
  setMessages: messages => set({ messages: [...FAKE_MESSAGES, ...messages] }),
  addMessage: message =>
    set(state => ({
      ...state,
      messages: state.messages ? [...state.messages, message] : [message],
    })),
}));

export default useConversationStore;
