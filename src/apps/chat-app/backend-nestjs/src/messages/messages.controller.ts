import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageGetDto } from './dto/message.get.dto';
import { MessageCreateDto } from './dto/message.create.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get()
  findAll(@Query() query: MessageGetDto) {
    return this.messagesService.findAll(query);
  }
  @Post()
  newUserMessage(@Body() body: MessageCreateDto) {
    return this.messagesService.newUserMessage(body);
  }
}
