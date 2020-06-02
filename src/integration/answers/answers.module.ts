import { Module } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Answer from '../../db/models/answer.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswersService],
  controllers: [AnswersController]
})
export class AnswersModule {}
