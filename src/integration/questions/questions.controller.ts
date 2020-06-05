import { Controller, Get, Post,Put, Delete, Body, Param, HttpStatus, HttpException} from '@nestjs/common';
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

    @Get('/database')
    getAllFromDataBase(): Promise<Question[]>{
        return this.questionService.findAllFromDataBase();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<Question>{
        return this.questionService.findById(id);
    }

    //Este controller pode não funcionar devido o retorno de Promise<pending>, então o getAll retorna um atributo no objeto com o tamanho.
    @Get('count') 
    async getNumberOfQuestions() : Promise<number>{
        return this.questionService.countNumberOfQuestions();
    }

    @Post('generate')
    async generateQuestionsToBd(){
        return this.questionService.generate();
    }
   
}
