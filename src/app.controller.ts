import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';


@Controller()
export class AppController {


  constructor(private appService: AppService){}

  @Get('/')
  async main(){
    return this.appService.getHello();
  }
}
