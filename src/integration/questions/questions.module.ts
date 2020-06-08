import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Question from '../../db/models/question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ConfigModule,  TypeOrmModule.forFeature([Question])],
  providers: [QuestionsService,  ConfigService],
  controllers: [QuestionsController],
  exports: [QuestionsService]
})
export class QuestionsModule {}
