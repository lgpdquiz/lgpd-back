import {Column, CreateDateColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';


@Entity()
export default class GlobalUsers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'double'})
    playersSumTotalAges: number;
    
    @Column({type: 'double'})
    playersSumTotalScore: number;

    @Column({type: 'double'})
    numberOfAuthoPlayers: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
}