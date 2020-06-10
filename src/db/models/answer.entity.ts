import {Column, CreateDateColumn, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, Unique} from 'typeorm';
import QuestionEntity from './question.entity';

/** - Entity of answers
*/

//schema
@Entity({name: 'answers'})
export default class Answer extends BaseEntity{
    
    @PrimaryColumn({primary: true})
    id: number;
    
    @Column()
    answer: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne('Question', 'answers')
    question: QuestionEntity; //.. baseado na resposta é retornado só 1 pergunta.

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}