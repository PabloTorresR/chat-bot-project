import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageGetDto } from './dto/message.get.dto';
import { MessagePostDto } from './dto/message.post.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get()
  findAll(@Query() query: MessageGetDto) {
    return this.messagesService.findAll(query);
  }
  @Post()
  postUserMessage(@Body() body: MessagePostDto) {
    return this.messagesService.postUserMessage(body);
  }
}
