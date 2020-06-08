import { Controller, Get, Post,Put, Delete, Body, Param, HttpStatus, HttpException} from '@nestjs/common';
import Question from '../../db/models/question.entity';
import { QuestionsService } from './questions.service';
import CreateQuestion from './create-question';


/** - This class contains requests from questions> .
*/
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService : QuestionsService){}

    @Get()
    getAll(): Promise<Question[]>{
        return this.questionService.findAll();
    }

    @Get('database')
    getAllFromDataBase(): Promise<Question[]>{
        return this.questionService.findAllFromDataBase();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<Question>{
        return this.questionService.findById(id);
    }
   
}
