import { Injectable } from '@nestjs/common';


//regra de negócio é aqui
@Injectable()
export class AppService {
  getHello(): string {
    return 'Bem vindo ao jogo LGPD trivia!';
  }
}
