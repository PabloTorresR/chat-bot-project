import { create } from 'zustand';

type ConversationStore = {
  conversation: string | null;
  setConversation: (conversation: string | null) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: null,
  setConversation: conversation => set({ conversation }),
}));

export default useConversationStore;
