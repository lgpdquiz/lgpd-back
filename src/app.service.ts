import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  
  async getHello(){
    return 'Bem vindo ao jogo LGPD trivia!';
  }
}
