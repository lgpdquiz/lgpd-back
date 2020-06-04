import QuestionEntity from '../../db/models/question.entity';
import CreateQuestion from './create-question';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query, Options } from '@nestjs/common';
import * as fs from 'fs';
import { isNotEmpty, IS_NOT_EMPTY, IsNotEmpty } from 'class-validator';
import { get } from 'https';

/** # Essa classe será responsavel por persistir as perguntas de forma estática.
*/


@Injectable()
export class QuestionsService { 

    private blockGenerated : boolean = false;    
    private questions : QuestionEntity[] = []; 

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
        if (!this.blockGenerated){
            const questionEntity : QuestionEntity = QuestionEntity.create();
            questionEntity.id = id;
            questionEntity.question = answer;
            questionEntity.createdAt = new Date();
            questionEntity.updatedAt = new Date();
            this.questions.push(questionEntity);
            return await this.questionRepository.save(await QuestionEntity.save(questionEntity));
        } 
    }

    async  generate(): Promise<any> {
        //Perguntas exemplo:
        this.create(1, "Perguntas1?");
        this.create(2, "Perguntas2?");
        this.create(3, "Perguntas3?");
        this.create(4, "Perguntas4?");
        this.create(5, "Perguntas5?");
        this.create(6, "Perguntas6?");
        this.create(7, "Perguntas7?");
        this.create(8, "Perguntas8?");
        this.create(9, "Perguntas9?");
        this.create(10, "Perguntas10?");
        this.create(11, "Perguntas11?");
        this.create(12, "Perguntas12?");
        this.create(13, "Perguntas13?");
        this.create(14, "Perguntas14?");

        if (!this.blockGenerated){
            const tamanho = new QuestionEntity();
            tamanho.size = this.questions.length.valueOf();
            this.questions.push(tamanho);
            this.blockGenerated = true;
        }
            
        return  await '### List of questions generated...';
    }

    async countNumberOfQuestions(): Promise<number>{
        return (await this.questionRepository.find()).length;
    }

    private async syncArrayObjectWithBD(){
        //validar se  o objeto esta de acordo com a tabela do banco ao criar e ao fazer um select (por ai id tmb);
        
    }

}
