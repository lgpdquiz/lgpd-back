import { Controller, Get, Post,Put, Delete, Body, Param} from '@nestjs/common';
import Question from '../../db/models/question.entity';
import { QuestionsService } from './questions.service';
import CreateQuestionDto from './create-question.dto';

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

    // @Post('create')
    // async create(@Body() newQuestion: Question): Promise<any> {
    //   return this.questionService.create(newQuestion);
    // }

    @Post('create')
    async create(@Body() newQuestion: CreateQuestionDto){
      return this.questionService.create(newQuestion);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() question: Question): Promise<any> {
        question.id = Number(id);
        console.log('Update #' + question.id);
        return this.questionService.update(question);
    }

    @Delete(':id/delete')
    async deleteById(@Param('id') id): Promise<any>{
        return this.questionService.delete(id);
    }
}
