import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(private matchService: MatchService) { }


    @Get('start')
    async start(){
        return this.matchService.startMatch();
    }

    @Get('stop')
    async stop(){
        return this.matchService.exitMatch();
    }

    @Get('getRandomQuestion')
    async getRandomQuestion(){
        return this.matchService.getNewQuestion();
    }

    @Get('finalResult')
    async getFinalResultInMatch(){
        return this.matchService.getFinalResultMatch();
    }

    @Get('timer')
    async getTimerFromQuestion(){
        return this.matchService.getTimer();
    }

    @Get('click/:id')
    async hasClicked(@Param('id') id : number){
        return this.matchService.choseAnswer(id);
    }
}
