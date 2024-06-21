export type FilterType = { value: string; operator: string; field: string };

export type QueryParams = {
  filters: FilterType[];
  orderBy: string;
  orderType: string;
  limit: string;
  offset: string;
};
