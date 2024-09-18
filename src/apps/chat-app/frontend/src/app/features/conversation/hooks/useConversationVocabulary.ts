import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { postCards } from '@chat-app/features/cards/api/cards';
import { LlmWord, LlmVocabulary } from '@chat-app/features/cards/types/vocabulary';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import { getNowTimestamp } from 'app/utils/time';
import useConversations from './useConversations';
import { useActiveModal } from '@chat-app/hooks/active-modal';
import { ModalName } from '@chat-app/enums/index';
import { queryClient } from '../../../../config/react-query';

const useConversationVocabulary = () => {
  const { messages } = useConversations();
  const activeModal = useActiveModal();
  const user = useUserSelector();
  const [vocabulary, setVocabulary] = useState<LlmVocabulary | undefined>();

  const lastMessageVocabulary = useMemo(() => messages?.[messages.length - 1]?.vocabulary, [messages]);

  const openConversationCardsModal = useCallback(() => {
    activeModal?.open(ModalName.CONVERSATION_CARDS);
  }, [activeModal]);

  const closeConversationCardsModal = useCallback(() => {
    activeModal?.close();
    queryClient.removeQueries({ queryKey: ['messages'] });
  }, [activeModal]);

  const setNewVocabulary = useCallback((vocabulary?: LlmVocabulary) => {
    setVocabulary(vocabulary);
  }, []);

  const discardCard = useCallback(
    (word: LlmWord) => {
      if (!vocabulary?.words) {
        return;
      }
      setVocabulary(prevVocabulary => {
        if (!prevVocabulary) {
          return prevVocabulary;
        }
        const updatedWords = prevVocabulary.words.filter(w => w.word !== word.word);
        const updatedVocabulary: LlmVocabulary = {
          ...prevVocabulary,
          words: updatedWords,
        };
        if (updatedWords.length === 0) {
          closeConversationCardsModal();
        }
        return updatedVocabulary;
      });
    },
    [vocabulary, closeConversationCardsModal],
  );

  const addCardToCollection = async (word: LlmWord) => {
    if (!user?.data?.sub || !vocabulary?.language || !vocabulary?.nativeLanguage) {
      return;
    }
    await postCards({
      ...word,
      id: uuidv4(),
      isLearned: false,
      createdAt: getNowTimestamp(),
      topics: vocabulary?.topics ?? [],
      userId: user?.data?.sub,
      language: vocabulary?.language,
      nativeLanguage: vocabulary?.nativeLanguage,
    });
    discardCard(word);
  };

  // Add new words to vocabulary when generated and execute callback
  useEffect(() => {
    if (!lastMessageVocabulary?.words?.length) {
      return;
    }
    setNewVocabulary(lastMessageVocabulary);
    openConversationCardsModal();
  }, [lastMessageVocabulary, setNewVocabulary]); //don't add openConversationCardsModal to dependencies it triggers infinite loop

  return {
    vocabulary,
    actions: {
      setNewVocabulary,
      addCardToCollection,
      discardCard,
    },
    modal: {
      isOpen: activeModal?.isOpen(ModalName.CONVERSATION_CARDS),
      open: openConversationCardsModal,
      close: closeConversationCardsModal,
    },
  };
};

export default useConversationVocabulary;
