import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { Filter } from '../../../../Shared/domain/criteria/Filter';
import { Operator } from '../../../../Shared/domain/criteria/FilterOperator';
import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { ScanCommandInput } from '@aws-sdk/lib-dynamodb';

interface DynamoDBQuery {
  filterExpression: ScanCommandInput['FilterExpression'];
  expressionAttributeValues: ScanCommandInput['ExpressionAttributeValues'];
  limit: number;
}

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class DynamoDBCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, string>>;

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, string>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
    ]);
  }

  public convert(criteria: Criteria): DynamoDBQuery {
    return {
      filterExpression: criteria.hasFilters() ? this.generateFilterExpression(criteria.filters) : undefined,
      expressionAttributeValues: criteria.hasFilters()
        ? this.generateExpressionAttributeValues(criteria.filters)
        : undefined,
      limit: criteria.limit ?? 1000,
    };
  }

  protected generateFilterExpression(filters: Filters): ScanCommandInput['FilterExpression'] {
    const expressions: string[] = [];

    filters.filters.forEach(filter => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      const expression = transformer(filter);
      expressions.push(expression);
    });

    return expressions.join(' AND ');
  }

  protected generateExpressionAttributeValues(filters: Filters): ScanCommandInput['ExpressionAttributeValues'] {
    const attributeValues: ScanCommandInput['ExpressionAttributeValues'] = {};

    filters.filters.forEach(filter => {
      attributeValues[`:${filter.field.value}`] = filter.value.value;
    });

    return attributeValues;
  }

  private equalFilter(filter: Filter): string {
    return `${filter.field.value} = :${filter.field.value}`;
  }

  private notEqualFilter(filter: Filter): string {
    return `${filter.field.value} <> :${filter.field.value}`;
  }

  private greaterThanFilter(filter: Filter): string {
    return `${filter.field.value} > :${filter.field.value}`;
  }

  private lowerThanFilter(filter: Filter): string {
    return `${filter.field.value} < :${filter.field.value}`;
  }

  private containsFilter(filter: Filter): string {
    return `contains(${filter.field.value}, :${filter.field.value})`;
  }

  private notContainsFilter(filter: Filter): string {
    return `NOT contains(${filter.field.value}, :${filter.field.value})`;
  }
}
