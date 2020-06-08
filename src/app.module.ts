import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import * as ormOptions from './config/orm';
import { QuestionsModule } from './integration/questions/questions.module';
import { AnswersModule } from './integration/answers/answers.module';
import { GlobalUsersModule } from './integration/globalUsers/globalUsers.module';


@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), QuestionsModule, AnswersModule, GlobalUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
