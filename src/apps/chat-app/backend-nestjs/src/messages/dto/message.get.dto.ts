import { FilterType, QueryParams } from 'dtos-lib/chatapp/filters';
import { IsArray, IsString, IsOptional } from 'class-validator';
import { FiltersContainField } from 'src/app/validators/fitlers-contain-field.validator';

export class MessageGetDto implements QueryParams {
  @IsArray()
  @FiltersContainField('userId')
  @FiltersContainField('conversationId')
  filters: FilterType[];

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  orderType: string;

  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  offset: string;
}
