import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { QuestionsModule } from 'src/integration/questions/questions.module';
import { AnswersModule } from 'src/integration/answers/answers.module';

@Module({
    imports: [AnswersModule, QuestionsModule],
    controllers: [MatchController],
    providers: [MatchService],
  
  })
export class MatchModule {}
