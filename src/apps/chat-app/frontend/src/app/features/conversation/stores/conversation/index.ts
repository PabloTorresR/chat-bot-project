import { create } from 'zustand';

type ConversationStore = {
  conversation: string | null;
  setConversation: (conversation: string | null) => void;
  isMessageLoading: boolean;
  setIsMessageLoading: (isMessageLoading: boolean) => void;
};

const useConversationStore = create<ConversationStore>(set => ({
  conversation: null,
  setConversation: conversation => set({ conversation }),
  isMessageLoading: false,
  setIsMessageLoading: isMessageLoading => set({ isMessageLoading }),
}));

export default useConversationStore;
