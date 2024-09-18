import { Module } from '@nestjs/common';
import { ConversationsModule } from '../conversations/conversations.module';
import { MessagesModule } from '../messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from '../cards/cards.controller.module';
import { AwsModule } from '../aws/aws.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), ConversationsModule, MessagesModule, CardsModule, AwsModule, DbModule],
})
export class AppModule {}
