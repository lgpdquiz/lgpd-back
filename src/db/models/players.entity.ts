import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';


/** - Entity of players
*/

@Entity({ name: 'players' })
export default class Players extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;
   
    @Column({ type: 'double'})
    score: number;
    
    savedInDataBase: boolean

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
   

}