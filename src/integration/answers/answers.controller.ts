import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import Answer from '../../db/models/answer.entity';
import Question from '../../db/models/question.entity';
import CreateAnswerDto from './create-answer.dto';
import { AnswersService } from './answers.service';


/** - This class contains requests from answers .
*/
@Controller('answers')
export class AnswersController {
    constructor(private answerService: AnswersService) { }

    @Get()
    getAll(): Promise<Answer[]> {
        return this.answerService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<Answer> {
        return this.answerService.findById(id);
    }
}
