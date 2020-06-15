import QuestionEntity from '../../db/models/question.entity';
import { QUESTIONS } from './questions.mock';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query, Options } from '@nestjs/common';



/** - This class is responsible for persisting the object of questions.
*/

@Injectable()
export class QuestionsService {
    questionsMocks = QUESTIONS;

    private idsQuestionsRandom: number[] = [];
    private idsAnswersRandom: number[] = [];
    private questionAndAnswerRandom: QuestionEntity;


    private questions: QuestionEntity[] = [];
    private idsAlreadyGenerated: number[] = [];
    private blockGenerated: boolean = false;
    private questionsGenerate: boolean = false;

    private tempObject: QuestionEntity;

    constructor(
        @InjectRepository(QuestionEntity)
        private questionRepository: Repository<QuestionEntity>,
    ) { }

    async getRepository() {
        return this.questionRepository;
    }
    async getIdsAlreadyGenerated() {
        return this.idsAlreadyGenerated;
    }

    isQuestionsGenerated(){
        return this.questionsGenerate;
    }

    getNumberOfQuestions(){
        return this.questions.length-1;
    }

    async findAll(): Promise<QuestionEntity[]> {
        return this.questions;
    }

    async findAllFromDataBase(): Promise<QuestionEntity[]> {
        return this.questionRepository.find();
    }

    async findById(id): Promise<QuestionEntity> {
        return await this.questionRepository.findOne(id);
    }

    async create(id: number, question: string): Promise<any> {
        if (!this.idsAlreadyGenerated.includes(id) && !this.blockGenerated) {
            const questionEntity: QuestionEntity = QuestionEntity.create({
                id: id,
                question: question,
                createdAt: new Date(),
                updatedAt: new Date(),
                answers: []
            });

            this.idsAlreadyGenerated.push(id);
            this.questions.push(questionEntity);
            await QuestionEntity.save(questionEntity);
        }
    }

    async generate() {

        if (!this.blockGenerated) {
            this.questionsMocks.forEach(item => {
                this.create(item.id, item.question).then(() => this.questionRepository).catch(() => console.log("reject"));
            });
            const tamanho = new QuestionEntity();
            tamanho.size = this.questions.length.valueOf();
            this.questions.push(tamanho);
            this.blockGenerated = true;
            this.questionsGenerate = true;
            return '### List of questions generated...';
        } else {
            this.questionsGenerate = true;
            return '### List of questions already generated...';
        }
    }

    /** Returns a random question with one right answer and three other random wrong answers*/
    async randomQuestionsAndAnswers(): Promise<QuestionEntity> {

        this.tempObject = this.randValidQuestionId();

        if (this.tempObject != undefined) {
            this.questionAndAnswerRandom = QuestionEntity.create({
                id: this.tempObject.id,
                question: this.tempObject.question,
                createdAt: this.tempObject.createdAt,
                updatedAt: this.tempObject.updatedAt,
                answers: this.tempObject.answers
            });
            this.randomValidAnswerId(this.questionAndAnswerRandom);
        }
        return this.questionAndAnswerRandom;
    }

    private rand(min, max) {
        let randomNum = Math.random() * (max - min) + min;
        console.log(Math.round(randomNum));
        return Math.round(randomNum);
    }

    private randomValidAnswerId(question: QuestionEntity) {
        let tempAllWrongAnswers = []
        let tempAnswers = []
        this.idsAnswersRandom = [];
        question.answers.find(answer => {
            if (answer.isCorrect) {
                tempAnswers.push(answer);
            } else {
                tempAllWrongAnswers.push(answer);
            }
        })

        for (let i = 0; i < 3; i++) {
            tempAnswers.push(this.randomizeIds(0, question.answers.length - 2, this.idsAnswersRandom, tempAllWrongAnswers));
        }
        console.log("QUESTIONS GERADAS: "+ this.idsQuestionsRandom.length)
        return this.questionAndAnswerRandom.answers = tempAnswers;

    }

    private randValidQuestionId() {
        return this.randomizeIds(0, this.questions.length - 2, this.idsQuestionsRandom, this.questions);
    }


    private randomizeIds(begin: number, arrayLength: number, arrayOfPositions: number[], arrayEntity: any[]) {
        let randomPositionInArray;
        let positionsComparedInCount = [];
        let countIds = 0;
        while (positionsComparedInCount.length < arrayLength) {
            randomPositionInArray = this.rand(begin, arrayLength);
            
            if (!arrayOfPositions.includes(randomPositionInArray)) {
                if (arrayEntity[randomPositionInArray] != undefined) {
                    arrayOfPositions.push(randomPositionInArray);
                    return arrayEntity[randomPositionInArray];
                }
            } else if (!positionsComparedInCount.includes(randomPositionInArray)) {
                positionsComparedInCount.push(randomPositionInArray);
                countIds++;
                randomPositionInArray = this.rand(begin, arrayLength);
            }
        }
    }

    async resetAllRandomQuestionsAndAnswers() {
       while(this.idsQuestionsRandom.length > 0){
        this.idsQuestionsRandom.pop();
       }

       while(this.idsAnswersRandom.length > 0){
        this.idsAnswersRandom.pop();
       }

         

    }


}

