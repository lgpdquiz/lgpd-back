import QuestionEntity from '../../db/models/question.entity';
import CreateQuestion from './create-question';
import { QUESTIONS } from './questions.mock';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query, Options } from '@nestjs/common';


/** - This class is responsible for persisting the object of questions.
*/

@Injectable()
export class QuestionsService { 
    questionsMocks = QUESTIONS;

    private questions : QuestionEntity[] = [];
    private idsAlreadyGenerated : number[] = [];
    private blockGenerated : boolean = false;
    
    constructor(
        @InjectRepository(QuestionEntity)
        private questionRepository : Repository<QuestionEntity>,
    ){}

    async  findAll(): Promise<QuestionEntity[]> {
        return this.questions;
    }

    async  findAllFromDataBase(): Promise<QuestionEntity[]> {
        return this.questionRepository.find();
    }

    async findById(id): Promise<QuestionEntity> {
        return await this.questionRepository.findOne(id);
    }

    async create(id: number, answer:string): Promise<any> {
        if(!this.idsAlreadyGenerated.includes(id) && !this.blockGenerated){
                const questionEntity : QuestionEntity = QuestionEntity.create();
                questionEntity.id = id;
                questionEntity.question = answer;
                questionEntity.createdAt = new Date();
                questionEntity.updatedAt = new Date();
                this.idsAlreadyGenerated.push(id);
                this.questions.push(questionEntity);
                await QuestionEntity.save(questionEntity);
        }
    }

    async generate(){
        
        if(!this.blockGenerated){
            this.questionsMocks.forEach(item => {
                this.create(item.id, item.question).then(() => this.questionRepository).catch(()=>console.log("reject"));
            });
            const tamanho = new QuestionEntity();
            tamanho.size = this.questions.length.valueOf();
            this.questions.push(tamanho);
            this.blockGenerated = true;  
            
            return '### List of questions generated...';
        }else{
            return '### List of questions already generated...';
        }
    }

    async countNumberOfQuestions(): Promise<number>{
        return ((await this.questionRepository.find()).length);
    }
    
    private async randomThreeWrongAnswers(){
        //retornar um objeto com tres perguntas erradas baseado no id da pergunta e na resposta correta
        
    }
    
    async getQuestionAndAnswers(){
        //retornar um objeto com a pergunta e a resposta correta dessa pergunta
        //e junto, retornar 3 perguntas aleatorias erradas.....
    }

    async getIdsAlreadyGenerated(){
        return this.idsAlreadyGenerated;
    }

    
    
}

