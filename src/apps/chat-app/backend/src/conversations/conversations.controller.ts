import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationGetDto } from './dto/conversation.get.dto';
import { ConversationCreateDto } from './dto/conversation.create.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  getAll(@Query() query: ConversationGetDto) {
    return this.conversationsService.getAll(query);
  }

  @Post()
  create(@Body() createConversationDto: ConversationCreateDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.conversationsService.delete(id);
  }
}
