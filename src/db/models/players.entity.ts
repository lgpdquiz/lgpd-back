import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity({name: 'players'})
export default class Players extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column({type: 'varchar', length: 50})
    nome: string;
    
    @Column()
    idade: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
}