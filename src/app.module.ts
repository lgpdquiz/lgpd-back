import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import * as ormOptions from './config/orm';

import { QuestionsModule } from './integration/questions/questions.module';
import { AnswersModule } from './integration/answers/answers.module';
import { PlayersModule } from './integration/player/players.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsService } from './integration/questions/questions.service';
import { AnswersService } from './integration/answers/answers.service';


@Module({
  imports: [ ConfigModule.forRoot({
    expandVariables: true,
  }),TypeOrmModule.forRoot(ormOptions), QuestionsModule, AnswersModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
