import PlayerEntity from '../../db/models/players.entity';
import CreatePlayerDto from './create-player.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayersService {
    
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository : Repository<PlayerEntity>,
    ){}

    async  findAll(): Promise<PlayerEntity[]> {
        return PlayerEntity.find();
    }

    async findById(id): Promise<PlayerEntity> {
        return await this.playerRepository.findOne(id);
    }

    async create(reqData: CreatePlayerDto): Promise<PlayerEntity> {
        const { nome , idade } = reqData; 
        const playerInstance = new PlayerEntity();
        playerInstance.nome = nome;
        playerInstance.idade = idade;

        return await this.playerRepository.save(await playerInstance.save());
    }

    async update(playerReq: PlayerEntity): Promise<UpdateResult> {
        return await this.playerRepository.update(playerReq.id, playerReq);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.playerRepository.delete(id);
    }

}
