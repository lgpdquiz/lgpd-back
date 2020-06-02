import {Column, JoinColumn, CreateDateColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity} from 'typeorm';
import AnswerEntity from './answer.entity';


@Entity()
export default class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    question: string;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;


    //associações
    @OneToMany(type => AnswerEntity, answer => answer.question)
    answers: AnswerEntity[]; //a questão retorna varias questões e as perguntas retorna só 1 pergunta.
}