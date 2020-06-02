import Answer from '../../db/models/answer.entity';
import Question from '../../db/models/question.entity';
import CreateAnswerDto from './create-answer.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AnswersService {
    
    constructor(
        @InjectRepository(Answer)
        private answerRepository : Repository<Answer>,
    ){}

    async  findAll(): Promise<Answer[]> {
        return Answer.find();
    }

    async findById(id): Promise<Answer> {
        return await this.answerRepository.findOne(id);
    }

    async create(reqData: CreateAnswerDto): Promise<Answer> {
        const { answer , isCorrect , questionId } = reqData; 
        const answerInstance = new Answer();
        answerInstance.answer = answer;
        answerInstance.isCorrect = isCorrect;
        answerInstance.question = await Question.findOne(questionId) ;
        
        return await this.answerRepository.save(await answerInstance.save());
    }

    async update(answer: Answer): Promise<UpdateResult> {
        return await this.answerRepository.update(answer.id, answer);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.answerRepository.delete(id);
    }

}
