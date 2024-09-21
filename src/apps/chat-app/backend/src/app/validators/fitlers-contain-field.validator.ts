import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { FilterType } from 'dtos-lib/chatapp/filters';

export function FiltersContainField(fieldName: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'containsFieldFilter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, _args: ValidationArguments) {
          const filters: FilterType[] = value;
          return filters.some(filter => filter.field === fieldName);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(_args: ValidationArguments) {
          return `filters must include one with field=${fieldName}`;
        },
      },
    });
  };
}
