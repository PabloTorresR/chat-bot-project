import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import useCardsQuery from '../queries/useCardsQuery';
import useCollectionFilterStore from '../stores/collection';
import { useMemo } from 'react';

const useCollection = () => {
  const user = useUserSelector();
  const { language, topics, difficulties, searchTerm } = useCollectionFilterStore();
  const { data: cards, isLoading } = useCardsQuery({
    queryParams: {
      userId: user?.data.sub,
      isLearned: undefined,
    },
  });
  const languageTags = useMemo(() => {
    return Array.from(new Set(cards?.map(card => card.language)));
  }, [cards]);

  const topicTags = useMemo(() => {
    return Array.from(new Set((cards?.map(card => card.topics) ?? []).flat())).sort();
  }, [cards]);

  //NOTE: Client side filtering for complex filters
  const filteredCards = cards?.filter(card => {
    if (language.value && card.language.toLowerCase() !== language.value.toLowerCase()) {
      return false;
    }
    if (
      searchTerm &&
      !card.word.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      !card.nativeWord.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) {
      return false;
    }
    if (difficulties.value.size && !difficulties.value.has(card.difficulty)) {
      return false;
    }
    if (topics.value?.size > 0 && !card.topics.some(topic => topics.value.has(topic))) {
      return false;
    }
    return true;
  });

  return {
    cards: filteredCards,
    isLoading,
    availableFilterTags: {
      languageTags,
      topicTags,
    },
    filters: { language, topics, difficulties, searchTerm },
  };
};

export default useCollection;
