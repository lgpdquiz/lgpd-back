import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { QuestionsService } from './integration/questions/questions.service';
import { AnswersService } from './integration/answers/answers.service';
import { QuestionsController } from './integration/questions/questions.controller';
import { AnswersController } from './integration/answers/answers.controller';
import { resolve } from 'dns';


/** - This class contains requests from App .
*/
@Controller()
export class AppController {
  
  constructor(private appService: AppService,private question: QuestionsService, private answers: AnswersService){}

  @Get('/start')
  async main(){
    this.question.generate();

    const callback = () => {
      this.answers.generate();
    };
    setInterval(callback, 4000);
  
    return 'Hello World';
  }
}
