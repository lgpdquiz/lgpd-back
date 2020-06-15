import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { QuestionsService } from './integration/questions/questions.service';
import { AnswersService } from './integration/answers/answers.service';
import { clearInterval } from 'timers';


/** - This class contains requests from App .
*/
@Controller()
export class AppController {

  constructor(private appService: AppService, private question: QuestionsService, private answers: AnswersService) { }

  @Get('/start')
  async start() {

    let count = 0;

    this.question.generate();

    var timerGenerateAnswers = setInterval(() => {
      this.answers.generate();
      console.log("##answers generated")
      clearInterval(timerGenerateAnswers);
    }, 2000);

    var timerSetAnswersToQuestions = setInterval(() => {
      this.answers.setAnswersToQuestions(this.question).catch(() => 'REJECT')
      console.log("###answers set to questions");

      count++;
      if (count > 1) {
        clearInterval(timerSetAnswersToQuestions);
      }
    }, 2000);


    return 'Hello World';
  }



}
