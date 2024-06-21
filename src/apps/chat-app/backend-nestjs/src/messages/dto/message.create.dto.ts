import { IsString, IsUUID, ValidateNested } from 'class-validator';

class HistoryMessageValidator {
  @IsUUID()
  id: string;

  @IsString()
  sender: string;

  @IsString()
  content: string;

  @IsString()
  createdAt: string;
}

class MessageValidator {
  @IsUUID()
  id: string;

  @IsString()
  sender: string;

  @IsString()
  content: string;

  @IsString()
  createdAt: string;

  @IsUUID()
  conversationId: string;

  @IsString()
  userId: string;
}
export class MessageCreateDto {
  @ValidateNested()
  message: MessageValidator;

  @ValidateNested()
  messageHistory: HistoryMessageValidator[];
}
