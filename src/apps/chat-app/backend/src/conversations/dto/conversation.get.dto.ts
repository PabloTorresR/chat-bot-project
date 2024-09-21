import { FilterType, QueryParams } from 'dtos-lib/chatapp/filters';
import { IsArray, IsString, IsOptional } from 'class-validator';
import { FiltersContainField } from 'src/app/validators/fitlers-contain-field.validator';

export class ConversationGetDto implements QueryParams {
  @IsArray()
  @FiltersContainField('userId')
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
