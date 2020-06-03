import QuestionEntity from '../../db/models/question.entity';
import CreateQuestion from './create-question';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query } from '@nestjs/common';
import * as fs from 'fs';

/** # Essa classe será responsavel por persistir as perguntas de forma estática.
*/


@Injectable()
export class QuestionsService { 

    constructor(
        @InjectRepository(QuestionEntity)
        private questionRepository : Repository<QuestionEntity>,
    ){}

    async  findAll(): Promise<QuestionEntity[]> {
        return await this.questionRepository.find();
    }

    async findById(id): Promise<QuestionEntity> {
        return await this.questionRepository.findOne(id);
       
    }

    async create(id: number, answer:string): Promise<any> {
            const questionEntity : QuestionEntity = QuestionEntity.create();
            questionEntity.id = id;
            questionEntity.question = answer;
            return await this.questionRepository.save(await QuestionEntity.save(questionEntity));
    }

    async  generate(): Promise<any> {
        //Perguntas exemplo:
        this.create(1, "funcionar1?");
        this.create(2, "Perguntas2?");
        this.create(3, "Perguntas3?");
        this.create(4, "Perguntas4?");
        this.create(5, "Perguntas5?");
        this.create(6, "Perguntas6?");
        this.create(7, "Perguntas7?");
        this.create(8, "Perguntas8?");
        
        return  await '### List of questions generated...';
    }

    async countNumberOfQuestions(): Promise<Number> {
        return  (await this.questionRepository.count()).valueOf();
    }

    async update(question: QuestionEntity): Promise<UpdateResult> {
        return await this.questionRepository.update(question.id, question);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.questionRepository.delete(id);
    }

}
