import { PostConversationsRequest } from 'dtos-lib/chatapp/conversations';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { QueryParams } from 'dtos-lib/chatapp/filters';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll(@Query() query: QueryParams) {
    return this.conversationsService.findAll(query);
  }

  @Post()
  create(@Body() createConversationDto: PostConversationsRequest) {
    return this.conversationsService.create(createConversationDto);
  }
}
