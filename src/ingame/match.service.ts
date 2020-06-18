import { Injectable } from '@nestjs/common';

import QuestionEntity from '../db/models/question.entity';
import { QuestionsService } from '../integration/questions/questions.service';
import AnswerEntity from 'src/db/models/answer.entity';
import Answer from 'src/db/models/answer.entity';
import { AnswersService } from 'src/integration/answers/answers.service';
import Players from 'src/db/models/players.entity';
import { PlayersService } from 'src/integration/player/players.service';

@Injectable()
export class MatchService {

    private totalTimeSpentInMatch: number = 0;
    private correctCount: number = 0;
    private wrongCount: number = 0;
    private scoreInQuestion: number = 1000;
    private finalScore: number = 0;
    private bonusCorrectAnswer: number = 40;

    private timerOn = false;
    private counterMs;

    private timePerQuestion: number = 0;
    private eachTenMs: number = 10000;
    private penaltyOnTimePoints: number = 40;
    private finalResultMatch = {};

    private newQuestion: QuestionEntity;
    private selectAnswer: AnswerEntity;
    private questionsRequests = 0;
    private matchStarted = false;
    private restartMatch = true;
    private numberTotalOfQuestions = 6;
    private showFinalInfo = false;
    private playerService: PlayersService


    constructor(private questionService: QuestionsService, private answerService: AnswersService) { }


    /** 
     * This method starts the match from the beginning */
    async startMatch() {

        let verifyQuestionExist: boolean = this.questionService.isQuestionsGenerated();
        this.questionsRequests = 0;
        this.showFinalInfo = false;
        this.resetInfo();

        if (verifyQuestionExist) {
            if (this.restartMatch) {
                this.questionService.resetAllRandomQuestionsAndAnswers();
            }
            this.matchStarted = true;
            this.init();
        } else {
            return 'Questions was not found, maybe was not generated?'
        }
    }

    /** 
     * This method ends the match */
    async exitMatch() {
        this.resetInfo();
        this.resetTimer();
        return 'The match is over';
    }

    /** 
     * This method generates several questions during the game, 
     * ends when the number of questions generate is less than 10, 
     * at the end it generates an object with the result */
    async init() {
        this.restartMatch = true;
        this.questionsRequests++;
        if (this.questionsRequests <= this.numberTotalOfQuestions) {
            this.newQuestion = await this.questionService.randomQuestionsAndAnswers().then(item => item);


            if (this.newQuestion != null && this.newQuestion != undefined) {
                this.resetTimer();
                this.startTimer();
            } else {
                console.log("question was not found");
                this.init();
            }

        } else {

            this.finalResultMatch = {
                finalScore: this.finalScore,
                totalOfCorrectAnswers: this.correctCount,
                totalOfWrongAnswers: this.wrongCount,
                totalTimeSpent: this.totalTimeSpentInMatch,
            }
            this.resetInfo();

            this.questionsRequests = 0;
            this.matchStarted = false;
            this.showFinalInfo = true;
            this.questionService.resetAllRandomQuestionsAndAnswers();
            this.stopTimer();
        };
    }


    /** 
     * This method is responsible for choosing an answer in the question object drawn by the parameter id */
    async choseAnswer(id: number) {
        if (this.matchStarted) {
            this.selectAnswer = this.newQuestion.answers.find(item => {
                if (item.id == id) {
                    return item;
                }
            })
            if (this.selectAnswer != null && this.selectAnswer != undefined) {

                if (this.selectAnswer.isCorrect) {
                    this.correctCount++;
                    let convertTimeToSecond = this.timePerQuestion / 1000;
                    this.scoreInQuestion -= convertTimeToSecond;
                    this.scoreInQuestion = this.calculateScorePerQuestion(this.scoreInQuestion);
                    this.scoreInQuestion += this.bonusCorrectAnswer;
                    this.finalScore += this.scoreInQuestion
                } else if (!this.selectAnswer.isCorrect) {
                    this.wrongCount++;
                    if (this.finalScore > 35) {
                        this.finalScore -= 35;
                    }

                }

                this.init();
            } else {
                return 'ID:' + id + ' does not exist';
            }
        } else {
            return 'The match hasnt started yet.'
        }
    }



    private calculateScorePerQuestion(score: number) {
        if (score >= 100 || score >= 10 && score < 100) {
            score = score / 10;
        } else if (score < 10 && score >= 0) {
            score = 1;
        } else {
            score = 0;
        }

        return score;
    }

    /**
     * Returns the current match question */
    async getNewQuestion() {
        if (this.newQuestion) {
            return this.newQuestion;
        }
    }

    /**
     * Returns the players final result in in match */
    async getFinalResultMatch() {
        if (this.showFinalInfo) {
            return this.finalResultMatch;
        } else {
            return 'No matches apparently finished.';
        }
    }

    /**
     * Returns the timer in seconds */
    async getTimer() {
        if (this.timerOn) {
            return this.timePerQuestion / 1000;
        } else {
            return 'The match hasnt started yet.';
        }
    }


    async startTimer() {
        if (this.timerOn) return;
        this.timerOn = true;
        this.counterMs = setInterval(() => {

            if (this.timePerQuestion <= 120000) {
                this.timePerQuestion += 1000;
                this.totalTimeSpentInMatch += 1000;
                console.log(this.timePerQuestion)
            }

            if ((this.timePerQuestion / this.eachTenMs) == 1) {
                this.eachTenMs += 10000;
                this.scoreInQuestion -= this.penaltyOnTimePoints;
            }

            if (this.timePerQuestion > 120000) {
                this.init();
            }

        }, 1000)

    }

    async resetTimer() {
        this.timePerQuestion = 0;
        this.eachTenMs = 0;
        this.scoreInQuestion = 1000;
        this.stopTimer();
        this.timerOn = false;
        this.counterMs = 0;
    }

    async stopTimer() {
        clearInterval(this.counterMs);
        this.timerOn = false;
        this.restartMatch = true;
    }

    async resetInfo() {
        // this.player = null;
        this.finalScore = 0;
        this.scoreInQuestion = 1000;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.totalTimeSpentInMatch = 0;
    }


}
