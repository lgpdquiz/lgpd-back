import { Column, CreateDateColumn, Entity, ManyToOne, BaseEntity, PrimaryColumn} from 'typeorm';
import QuestionEntity from './question.entity';

/** - Entity of answers
*/

//schema
@Entity({ name: 'answers' })
export default class Answer extends BaseEntity {

    @PrimaryColumn({ primary: true })
    id: number;

    @Column()
    answer: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne('Question', 'answers')
    question: QuestionEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}