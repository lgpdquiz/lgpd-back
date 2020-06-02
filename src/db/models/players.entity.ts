import {Column, CreateDateColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';


@Entity()
export default class Players extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', length: 50})
    nome: string;
    
    @Column()
    idade: number;

    @Column({type: 'double'})
    pontuacao: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
}