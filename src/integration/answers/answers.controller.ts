import {Controller, Get, Post,Put, Delete, Body, Param} from '@nestjs/common';
import Answer from '../../db/models/answer.entity';
import Question from '../../db/models/question.entity';
import CreateAnswerDto from './create-answer.dto';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
    constructor(private answerService : AnswersService){}

    @Get()
    getAll(): Promise<Answer[]>{
        return this.answerService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<Answer>{
        return this.answerService.findById(id);
    }

    @Post('create')
    async create(@Body() newQuestion: CreateAnswerDto){
      return this.answerService.create(newQuestion);
    }


    @Put(':id/update')
    async update(@Param('id') id, @Body() answer: Answer): Promise<any> {
        answer.id = Number(id);
        console.log('Update #' + answer.id);
        return this.answerService.update(answer);
    }

    @Delete(':id/delete')
    async deleteById(@Param('id') id): Promise<any>{
        return this.answerService.delete(id);
    }
}
