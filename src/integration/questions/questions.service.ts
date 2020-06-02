import Question from '../../db/models/question.entity';
import CreateQuestionDto from './create-question.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionRepository : Repository<Question>,
    ){}

    async  findAll(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    async findById(id): Promise<Question> {
        return await this.questionRepository.findOne(id);
    }

    // async  create(question: Question): Promise<Question> {
        
    //     return await this.questionRepository.save(question);
    // }

    async  create(newQuestion: CreateQuestionDto): Promise<Question> {
        const questionEntity : Question = Question.create();
        const { question } = newQuestion;
        questionEntity.question = question;
        return await this.questionRepository.save(await Question.save(questionEntity));
    }

    async update(question: Question): Promise<UpdateResult> {
        return await this.questionRepository.update(question.id, question);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.questionRepository.delete(id);
    }

}
