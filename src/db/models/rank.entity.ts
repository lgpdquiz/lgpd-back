import { CreateDateColumn, Entity, ManyToOne, BaseEntity, PrimaryColumn} from 'typeorm';
import Player from './players.entity';

/** - Entity of answers
*/

//schema
@Entity({ name: 'ranks' })
export default class Rank extends BaseEntity {

    @PrimaryColumn({ primary: true })
    id: number;

    @ManyToOne('Players', 'ranklist')
    player: Player[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}