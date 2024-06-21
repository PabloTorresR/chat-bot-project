import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationGetDto } from './dto/conversation.get.dto';
import { ConversationCreateDto } from './dto/conversation.create.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll(@Query() query: ConversationGetDto) {
    return this.conversationsService.findAll(query);
  }

  @Post()
  create(@Body() createConversationDto: ConversationCreateDto) {
    return this.conversationsService.create(createConversationDto);
  }
}
