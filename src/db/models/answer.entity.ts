import {Column, CreateDateColumn, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity} from 'typeorm';
import QuestionEntity from './question.entity';


//schema
@Entity({name: 'answers'})
export default class Answer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    answer: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(type => QuestionEntity, question => question.answers, {primary: true})
    question: QuestionEntity; //.. baseado na resposta é retornado só 1 pergunta.

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}