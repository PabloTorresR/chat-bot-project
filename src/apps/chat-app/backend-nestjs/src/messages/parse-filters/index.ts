import { FilterType } from 'dtos-lib/chatapp/filters';

export const parseFilters = (params: Array<FilterType>): Map<string, string>[] => {
  if (!params) {
    return new Array<Map<string, string>>();
  }

  return params.map(filter => {
    const field = filter.field;
    const value = filter.value;
    const operator = filter.operator;

    return new Map([
      ['field', field],
      ['operator', operator],
      ['value', value],
    ]);
  });
};
