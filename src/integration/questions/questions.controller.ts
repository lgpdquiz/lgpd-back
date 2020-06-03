import { Controller, Get, Post,Put, Delete, Body, Param} from '@nestjs/common';
import Question from '../../db/models/question.entity';
import { QuestionsService } from './questions.service';
import CreateQuestion from './create-question';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService : QuestionsService){}

    @Get()
    getAll(): Promise<Question[]>{
        return this.questionService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<Question>{
        return this.questionService.findById(id);
    }

    @Post('generate')
    async generateQuestionsToBd(){
        return this.questionService.generate();
    }
   
}
