import { create } from 'zustand';
import { Message } from '../../types/message';
import { Conversation } from '../../types/conversation';
import { MessageSender } from '../../enums/message-sender';


type ConversationStore = {
  conversation?: Conversation | null;
  messages?: Message[];
  setConversation: (conversation?: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: null,
  messages: [],
  setConversation: conversation => set({ conversation }),
  setMessages: messages => set({ messages }),
  addMessage: message =>
    set(state => ({
      ...state,
      messages: state.messages ? [...state.messages, message] : [message],
    })),
}));

export default useConversationStore;
