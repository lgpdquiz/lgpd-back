import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { QuestionsModule } from 'src/integration/questions/questions.module';
import { AnswersService } from 'src/integration/answers/answers.service';
import { QuestionsService } from 'src/integration/questions/questions.service';
import { AnswersModule } from 'src/integration/answers/answers.module';

@Module({
    imports: [QuestionsModule, AnswersModule, QuestionsModule],
    controllers: [MatchController],
    providers: [MatchService],
  
  })
export class MatchModule {}
