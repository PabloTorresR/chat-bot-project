import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { PostMessagesRequest } from 'dtos-lib/chatapp/messages';
import { QueryParams } from 'dtos-lib/chatapp/filters';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get()
  findAll(@Query() query: QueryParams) {
    return this.messagesService.findAll(query);
  }
  @Post()
  newUserMessage(@Body() body: PostMessagesRequest) {
    return this.messagesService.newUserMessage(body);
  }
}
