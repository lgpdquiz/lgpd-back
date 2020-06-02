import PlayerEntity from '../../db/models/players.entity';
import CreatePlayerDto from './create-player.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

/** # Essa classe será responsavel por persistir as respostas de forma estática.
*/

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
        const { nome , idade , pontuacao } = reqData; 
        const playerInstance = new PlayerEntity();
        playerInstance.nome = nome;
        playerInstance.idade = idade;
        playerInstance.pontuacao = pontuacao;
        return await this.playerRepository.save(await playerInstance.save());
    }

    async update(playerReq: PlayerEntity): Promise<UpdateResult> {
        return await this.playerRepository.update(playerReq.id, playerReq);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.playerRepository.delete(id);
    }

}
