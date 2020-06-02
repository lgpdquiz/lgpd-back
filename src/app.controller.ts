import { Controller, Get, Post, Body } from '@nestjs/common';
import Question from './db/models/question.entity';

@Controller()
export class AppController {
  @Get('/')
  async hello(){
      return 'Ola mundo!';
  }
}
