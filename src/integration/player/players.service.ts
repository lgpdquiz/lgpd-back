import PlayerEntity from '../../db/models/players.entity';
import CreatePlayerDto from './create-player.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayersService {

    private playersInRank = []
    
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

    async create(reqData: PlayerEntity): Promise<PlayerEntity> { 
        const playerInstance : PlayerEntity = PlayerEntity.create({
            name: reqData.name,
            score: 0,
            savedInDataBase: reqData.savedInDataBase,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        let isOnRecordList = this.verifyRecordScoreFromPlayer();

        if(reqData.savedInDataBase == true && isOnRecordList){

            return await PlayerEntity.save(playerInstance);
        }
    }

    verifyRecordScoreFromPlayer(){
        return true;
    }

    //classificao table
    sortFromSmalestToLargestScore(){

    }

    async update(playerReq: PlayerEntity): Promise<UpdateResult> {
        return await this.playerRepository.update(playerReq.id, playerReq);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.playerRepository.delete(id);
    }

}
