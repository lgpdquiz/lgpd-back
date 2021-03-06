import PlayerEntity from '../../db/models/players.entity';

import { UpdateResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayersService {

    private idsPlayersCreated: number[] = [];

    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>
    ) { }

    async findAll(){
        return PlayerEntity.find().then(item=> item);
    }

    async findById(id): Promise<PlayerEntity> {
        return await this.playerRepository.findOne(id);
    }

    async verifyPlayersCreated(id: number) {
        return this.idsPlayersCreated.includes(id);
    }

    async create(newPlayer: PlayerEntity) {

        let playerInstance: PlayerEntity = PlayerEntity.create({
            name: newPlayer.name,
            score: 0.0,
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
