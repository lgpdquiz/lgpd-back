import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Answer from '../../db/models/answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from 'src/app.module';

@Module({

  imports: [ConfigModule, TypeOrmModule.forFeature([Answer])],
  providers: [AnswersService, ConfigService],
  controllers: [AnswersController],
  exports: [AnswersService]
})
export class AnswersModule { }
