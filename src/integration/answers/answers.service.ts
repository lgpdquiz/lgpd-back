import AnswerEntity from '../../db/models/answer.entity';
import QuestionEntity from '../../db/models/question.entity';
import CreateAnswerDto from './create-answer.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


/** # Essa classe será responsavel por persistir as respostas de forma estática.
*/

@Injectable()
export class AnswersService {
    private idsAlreadyGenerated : Number[] = [];
    private answersArray : AnswerEntity[] = [];
    private blockGenerated : boolean = false;
    private idAnswer : number = 1;

    constructor(
        @InjectRepository(AnswerEntity)
        private answerRepository : Repository<AnswerEntity>,
    ){}

    async  findAll(): Promise<AnswerEntity[]> {
       return this.answersArray;
    }

    async findById(id): Promise<AnswerEntity> {
        return await this.answerRepository.findOne(id);
    }

    private async create(answer: string, isCorrect: boolean, questionId: number): Promise<AnswerEntity> {
        
        let arrayIdsContain = this.idsAlreadyGenerated.includes(this.idAnswer);
        let findQuestionWithId = QuestionEntity.findOne(questionId).then(item => item.id == questionId);
        if ( !this.blockGenerated && !arrayIdsContain && findQuestionWithId){   
            let answerEntity : AnswerEntity =  AnswerEntity.create();
            answerEntity.id = this.idAnswer;
            answerEntity.answer = answer;
            answerEntity.isCorrect = isCorrect;
            answerEntity.createdAt = new Date();
            answerEntity.updatedAt = new Date();
            this.idsAlreadyGenerated.push(this.idAnswer);
            this.idAnswer++;           
            answerEntity.question = await QuestionEntity.findOne(questionId).then(item=>item);
            this.answersArray.push(answerEntity);

            return await this.answerRepository.save(await AnswerEntity.save(answerEntity));
                
        }
        
        //  validar para não instanciar novos objetos quando o id da questão não existir.
        //  [...]
        
    }

    
    
    async generate(){
        if(!this.blockGenerated){
            //1
            this.create("resposta 1 da 1 certa", true, 1);
            this.create("resposta 2 da 1 errada", false, 1);
            this.create("resposta 3 da 1 errada", false, 1);
            this.create("resposta 4 da 1 errada", false, 1);
                
            //2
            this.create("resposta 1 da 2 certa", true, 2);
            this.create("resposta 2 da 2 errada", false, 2);
            this.create("resposta 3 da 2 errada", false, 2);
            this.create("resposta 4 da 2 errada", false, 2);
                
            //3
            this.create("resposta 1 da 3 certa", true, 3);
            this.create("resposta 2 da 3 errada", false, 3);
            this.create("resposta 3 da 3 errada", false, 3);
            this.create("resposta 4 da 3 errada", false, 3);
                
            //4
            this.create("resposta 1 da 4 certa", true, 4);
            this.create("resposta 2 da 4 errada", false, 4);
            this.create("resposta 3 da 4 errada", false, 4);
            this.create("resposta 4 da 4 errada", false, 4);

            this.blockGenerated = true;

            return  await '### List of answers generated...';
        }else{
            return await '### List of questions already generated...';
        }
    }

}
