import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardCreateDto } from './dto/card.create.dto';
import { CardGetDto } from './dto/card.get.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async getAll(@Query() query: CardGetDto) {
    return this.cardsService.getAll(query);
  }

  // @Get(':id')
  // async getById(@Param('id') id: string) {
  //   return this.cardsService.getById(id);
  // }

  @Post()
  async createCard(@Body() createCardDto: CardCreateDto) {
    return this.cardsService.create(createCardDto);
  }

  //   @Put(':id')
  //   async updateCard(@Param('id') id: string, @Body() updatedCard: Card) {
  //     return this.cardsService.update(id, updatedCard);
  //   }

  //   @Delete(':id')
  //   async deleteCard(@Param('id') id: string) {
  //     return this.cardsService.delete(id);
  //   }
}
