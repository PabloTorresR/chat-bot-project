import { useQuery } from '@tanstack/react-query';
import { FilterType } from 'dtos-lib/chatapp/filters';
import { GET_CARDS_QUERY_PARAMS } from '@chat-app/enums/query-params';
import { getCards } from '../api/cards';
import { Card } from '../types/vocabulary';

interface Props {
  queryParams: { [key in GET_CARDS_QUERY_PARAMS]: string | string[] | number[] | undefined };
}

const useCardsQuery = ({ queryParams }: Props) => {
  const queryKey = Object.keys(queryParams).map(key => queryParams[key]);
  return useQuery<Card[]>({
    queryKey: ['cards', ...queryKey],
    queryFn: async () => {
      if (!queryParams.userId) {
        return [];
      }
      const filters: FilterType[] = buildFilters(
        queryParams.userId as string,
        // queryParams.difficulty as number[],
        !!queryParams.isLearned as boolean,
        // queryParams.topics as string[],
      );
      const { data } = await getCards({
        params: {
          filters,
        },
      });
      return orderByDate(data as Card[]) ?? [];
    },
  });
};

//TODO: do filtering on the server side
const buildFilters = (userId: string, isLearned?: boolean) => {
  const filters: FilterType[] = [{ value: userId, operator: '=', field: GET_CARDS_QUERY_PARAMS.USER_ID }];
  // if (difficulty?.length) {
  //     filters.push({ value: difficulty, operator: '=', field: GET_CARDS_QUERY_PARAMS.DIFFICULTY }),
  // }
  if (isLearned) {
    filters.push({ value: 'true', operator: '=', field: GET_CARDS_QUERY_PARAMS.IS_LEARNED });
  }
  // if (topics?.length) {
  //   topics.forEach(topic => filters.push({ value: topic, operator: 'CONTAINS', field: GET_CARDS_QUERY_PARAMS.TOPICS }));
  // }

  return filters;
};

const orderByDate = (cards: Card[]) => {
  return cards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export default useCardsQuery;
