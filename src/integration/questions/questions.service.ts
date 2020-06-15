import QuestionEntity from '../../db/models/question.entity';
import CreateQuestion from './create-question';
import { QUESTIONS } from './questions.mock';
import AnswerEntity from '../../db/models/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query, Options } from '@nestjs/common';
import { AnswersService } from '../answers/answers.service';


/** - This class is responsible for persisting the object of questions.
*/

@Injectable()
export class QuestionsService { 
    questionsMocks = QUESTIONS;

    private idsQuestionsRandom : number[] = [];
    private idsAnswersRandom : number[] = [];
    private questionAndAnswerRandom : QuestionEntity;




    private questions : QuestionEntity[] = [];
    private idsAlreadyGenerated : number[] = [];
    private blockGenerated : boolean = false;
    
    constructor(
        @InjectRepository(QuestionEntity)
        private questionRepository : Repository<QuestionEntity>,
    ){}

    async getIdsAlreadyGenerated(){
        return this.idsAlreadyGenerated;
    }

    async countNumberOfQuestions(): Promise<number>{
        return ((await this.questionRepository.find()).length);
    }
    
    async  findAll(): Promise<QuestionEntity[]> {
        return this.questions;
    }

    async  findAllFromDataBase(): Promise<QuestionEntity[]> {
        return this.questionRepository.find();
    }

    async findById(id): Promise<QuestionEntity> {
        return await this.questionRepository.findOne(id);
    }

    async create(id: number, question:string): Promise<any> {
        if(!this.idsAlreadyGenerated.includes(id) && !this.blockGenerated){
                const questionEntity : QuestionEntity = QuestionEntity.create({
                    id : id,
                    question : question,
                    createdAt : new Date(),
                    updatedAt : new Date(),
                    answers : []
                });
                
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
    
    /** Returns a random question with one right answer and three other random wrong answers*/
    async randomQuestionsAndAnswers() : Promise<any>{
        
       let tempObject : QuestionEntity;
       tempObject = this.randValidQuestionId();
        
       if(tempObject != null){
            this.questionAndAnswerRandom = QuestionEntity.create({
                id: tempObject.id,
                question: tempObject.question,
                createdAt: tempObject.createdAt,
                updatedAt: tempObject.updatedAt,
                answers: tempObject.answers
            });
                this.randomValidAnswerId(this.questionAndAnswerRandom)
                return this.questionAndAnswerRandom;
        }
        return null;

    }

    private rand(min, max) {
        let randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum);
    }

    private randomValidAnswerId(question: QuestionEntity){
        let tempAllWrongAnswers = []
        let tempAnswers = []
        this.idsAnswersRandom = [];
        question.answers.find(answer =>{
            if(answer.isCorrect){
                tempAnswers.push(answer);
            }else{
                tempAllWrongAnswers.push(answer);
            }
        })
        
        for(let i=0; i<3; i++){ 
            tempAnswers.push(this.randomizeIds(0, question.answers.length-2, this.idsAnswersRandom, tempAllWrongAnswers));
        }
        
        return this.questionAndAnswerRandom.answers = tempAnswers;

    }

    private randValidQuestionId(){
        return this.randomizeIds(0, this.questions.length-2, this.idsQuestionsRandom, this.questions);
    }


    private randomizeIds(begin: number, arrayLength: number, arrayOfIds: number[], arrayEntity: any[]){
        let randomNumberForId;
        let idsComparedInCount = [];
        let countIds = 0;
        while(idsComparedInCount.length<arrayLength){
            randomNumberForId = this.rand(begin, arrayLength);

            if(!arrayOfIds.includes(randomNumberForId)){
                arrayOfIds.push(randomNumberForId);
                if(arrayEntity[randomNumberForId]!= null){
                    return arrayEntity[randomNumberForId];
                }

            }else if (!idsComparedInCount.includes(randomNumberForId)){
                    idsComparedInCount.push(randomNumberForId);
                    countIds++;
                    randomNumberForId = this.rand(begin, arrayLength); 
            } 
        }
    }


}

