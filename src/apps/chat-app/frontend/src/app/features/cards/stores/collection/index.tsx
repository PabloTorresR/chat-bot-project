import { create } from 'zustand';

enum SetOperation {
  ADD = 'add',
  DELETE = 'delete',
  TOGGLE = 'toggle',
}

type FilterState = {
  language: {
    value: string | null;
    actions: {
      setLanguage: (language: string) => void;
    };
  };
  topics: {
    value: Set<string>;
    actions: {
      addTopic: (topic: string) => void;
      deleteTopic: (topic: string) => void;
      clearTopics: () => void;
      toggleTopic: (topic: string) => void;
    };
  };
  difficulties: {
    value: Set<number>;
    actions: {
      addDifficulty: (difficulty: number) => void;
      deleteDifficulty: (difficulty: number) => void;
      clearDifficulties: () => void;
      toggleDifficulty: (difficulty: number) => void;
    };
  };
  searchTerm: { value: string; actions: { setSearchTerm: (searchTerm: string) => void } };
};

const useCollectionFilterStore = create<FilterState>(set => {
  return {
    language: {
      value: null,
      actions: {
        setLanguage: language => set(state => ({ language: { ...state.language, value: language } })),
      },
    },
    topics: {
      value: new Set(),
      actions: {
        addTopic: topics =>
          set(state => ({
            topics: { ...state.topics, value: updateSet(state.topics.value, topics, SetOperation.ADD) },
          })),
        deleteTopic: topics =>
          set(state => ({
            topics: { ...state.topics, value: updateSet(state.topics.value, topics, SetOperation.DELETE) },
          })),
        clearTopics: () => set(state => ({ topics: { ...state.topics, value: new Set() } })),
        toggleTopic: topics =>
          set(state => ({
            topics: { ...state.topics, value: updateSet(state.topics.value, topics, SetOperation.TOGGLE) },
          })),
      },
    },
    difficulties: {
      value: new Set(),
      actions: {
        addDifficulty: difficulty =>
          set(state => ({
            difficulties: {
              ...state.difficulties,
              value: updateSet(state.difficulties.value, difficulty, SetOperation.ADD),
            },
          })),
        deleteDifficulty: difficulty =>
          set(state => ({
            difficulties: {
              ...state.difficulties,
              value: updateSet(state.difficulties.value, difficulty, SetOperation.DELETE),
            },
          })),
        clearDifficulties: () => set(state => ({ difficulties: { ...state.difficulties, value: new Set() } })),
        toggleDifficulty: difficulty =>
          set(state => ({
            difficulties: {
              ...state.difficulties,
              value: updateSet(state.difficulties.value, difficulty, SetOperation.TOGGLE),
            },
          })),
      },
    },
    searchTerm: {
      value: '',
      actions: {
        setSearchTerm: searchTerm => set(state => ({ searchTerm: { ...state.searchTerm, value: searchTerm } })),
      },
    },
  };
});

const updateSet = <T,>(originalSet: Set<T>, value: T, operation: SetOperation) => {
  const newSet = new Set(originalSet);
  if (operation === SetOperation.ADD) {
    newSet.add(value);
  } else if (operation === SetOperation.DELETE) {
    newSet.delete(value);
  } else if (operation === SetOperation.TOGGLE) {
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
  }
  return newSet;
};

export default useCollectionFilterStore;
