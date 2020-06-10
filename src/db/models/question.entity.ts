import {Column, CreateDateColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn} from 'typeorm';
import AnswerEntity from './answer.entity';

/** - Entity of questions
*/

@Entity({name: 'questions'})
export default class Question extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    question: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    size : number;

    //associações
    @OneToMany('Answer', 'question')
    answers: AnswerEntity[]; //a questão retorna varias questões e as perguntas retorna só 1 pergunta.
}