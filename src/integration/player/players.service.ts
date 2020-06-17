import PlayerEntity from '../../db/models/players.entity';
import CreatePlayerDto from './create-player.dto';

import { UpdateResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Players from '../../db/models/players.entity';


@Injectable()
export class PlayersService {

    private idsPlayersCreated: number[] = [];
    private players: Players[];


    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
    ) { }

    async findAll(): Promise<PlayerEntity[]> {
        return PlayerEntity.find();
    }

    async findById(id): Promise<PlayerEntity> {
        return await this.playerRepository.findOne(id);
    }

    async create(newPlayer: PlayerEntity): Promise<PlayerEntity> {
        console.log(newPlayer)
        let playerInstance: PlayerEntity = PlayerEntity.create({
            name: newPlayer.name,
            score: 0,
            savedInDataBase: newPlayer.savedInDataBase,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        

        await PlayerEntity.save(playerInstance);
        this.idsPlayersCreated.push(PlayerEntity.getId(playerInstance));
        return playerInstance;
       
    }

    async update(playerReq: PlayerEntity): Promise<UpdateResult> {
        return await PlayerEntity.update(playerReq.id, playerReq)

    }

    async delete(id): Promise<DeleteResult> {
        let arrayWithouId = [];
        let found = false;
        this.idsPlayersCreated.forEach(item => {
            if (item != id) {
                found = true;
                arrayWithouId.push(item);
            }
        });

        if (arrayWithouId.length == 1 && !found) {
            arrayWithouId.pop();
        } else {
            console.log("## Empty array");
        }
        this.idsPlayersCreated = arrayWithouId;
        return await PlayerEntity.delete(id);
    }

}
