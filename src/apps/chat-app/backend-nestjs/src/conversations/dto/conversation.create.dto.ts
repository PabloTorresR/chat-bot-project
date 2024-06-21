import { IsString, IsUUID } from 'class-validator';
import { PostConversationsRequest } from 'dtos-lib/chatapp/conversations';

export class ConversationCreateDto implements PostConversationsRequest {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  userId: string;
}
