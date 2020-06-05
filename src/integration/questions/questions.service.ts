import QuestionEntity from '../../db/models/question.entity';
import CreateQuestion from './create-question';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query, Options } from '@nestjs/common';
import * as fs from 'fs';
import { isNotEmpty, IS_NOT_EMPTY, IsNotEmpty, validate } from 'class-validator';
import { get } from 'https';

/** # Essa classe será responsavel por persistir as perguntas de forma estática.
*/


@Injectable()
export class QuestionsService { 

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
                return await this.questionRepository.save(await QuestionEntity.save(questionEntity)); 
        }
    }

    async  generate(): Promise<any> {
        if(!this.blockGenerated){
            //Perguntas exemplo:
            this.create(1, "Perguntas1?");
            this.create(2, "Perguntas2?");
            this.create(3, "Perguntas3?");
            this.create(4, "Perguntas4?");
        
            if (!this.blockGenerated){
                const tamanho = new QuestionEntity();
                tamanho.size = this.questions.length.valueOf();
                this.questions.push(tamanho);
                this.blockGenerated = true;
            }
                
            return  await '### List of questions generated...';
        }else{
            return await '### List of questions already generated...';
        }
    }

    async countNumberOfQuestions(): Promise<number>{
        
        return ((await this.questionRepository.find()).length);
        
    }

    private async syncArrayObjectWithBD(){
        //validar se  o objeto esta de acordo com a tabela do banco ao criar e ao fazer um select (por ai id tmb);
        
    }

    async getQuestionAndAnswers(){
        //retornar um objeto com a pergunta e a resposta correta dessa pergunta
        //e junto, retornar 3 perguntas aleatorias erradas.....

       

    }

    private async randomThreeWrongAnswers(){
        //retornar um objeto com tres perguntas erradas baseado no id da pergunta e na resposta correta

    }

}
