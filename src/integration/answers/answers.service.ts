import AnswerEntity from '../../db/models/answer.entity';
import QuestionEntity from '../../db/models/question.entity';
import { ANSWERS } from './answers.mock';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';


/** - This class is responsible for persisting the object of answers <require existing questions in the database> .
*/

@Injectable()
export class AnswersService {
    private idsAlreadyGenerated : Number[] = [];
    private answersArrayOfEntity : AnswerEntity[] = [];
    private blockGenerated : boolean = false;
    answerMocks = ANSWERS;
    
    constructor(
        @InjectRepository(AnswerEntity)
        private answerRepository : Repository<AnswerEntity>,
    ){}

    async  findAll(): Promise<AnswerEntity[]> {
       return this.answersArrayOfEntity;
    }

    async findById(id): Promise<AnswerEntity> {
        return await this.answerRepository.findOne(id);
    }

    private async create(idAnswer: number, answer: string, isCorrect: boolean, questionId: number){
        this.blockGenerated = false;
        let arrayIdsContain = this.idsAlreadyGenerated.includes(idAnswer);
        let findQuestionWithId = QuestionEntity.findOne(questionId).then(item => item.id == questionId);

        if ( !this.blockGenerated && !arrayIdsContain && findQuestionWithId){
            let newAnswerEntity : AnswerEntity =  AnswerEntity.create();
            newAnswerEntity.id = idAnswer;
            newAnswerEntity.answer = answer;
            newAnswerEntity.isCorrect = isCorrect;
            newAnswerEntity.createdAt = new Date();
            newAnswerEntity.updatedAt = new Date();
            this.idsAlreadyGenerated.push(idAnswer);
            newAnswerEntity.question =  await QuestionEntity.findOne(questionId).then(item=>item);
            this.answersArrayOfEntity.push(newAnswerEntity);
            await AnswerEntity.save(newAnswerEntity)
        }               
    }

    async generate(){
        let findQuestion = await QuestionEntity.find().then(item => item);

        if(!this.blockGenerated && findQuestion){ 
            this.answerMocks.forEach(item => {
                this.create(item.id, item.answer, item.isCorrect, item.questionId).catch(()=>console.log("reject"));
            });
            this.blockGenerated = true;
            return '### List of answers generated...';
        }
    }

}
