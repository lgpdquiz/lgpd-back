import GlobalUsersEntity from '../../db/models/globalUsers.entity';
import CreateGlobalUsersDto from './create-globalUsers.dto';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalUsersService {
    constructor(
        @InjectRepository(GlobalUsersEntity)
        private globalUsersRepository : Repository<GlobalUsersEntity>,
    ){}

    async  findAll(): Promise<GlobalUsersEntity[]> {
        return await this.globalUsersRepository.find();
    }

    async findById(id): Promise<GlobalUsersEntity> {
        return await this.globalUsersRepository.findOne(id);
    }

    async  create(newUser: CreateGlobalUsersDto): Promise<GlobalUsersEntity> {
        const usersEntity : GlobalUsersEntity = GlobalUsersEntity.create();
        const { playersSumTotalAges, playersSumTotalScore, numberOfAuthoPlayers } = newUser;
        
        usersEntity.playersSumTotalAges = playersSumTotalAges;
        usersEntity.playersSumTotalScore = playersSumTotalScore;
        usersEntity.numberOfAuthoPlayers = numberOfAuthoPlayers;

        return await this.globalUsersRepository.save(await GlobalUsersEntity.save(usersEntity));
    }

    async update(question: GlobalUsersEntity): Promise<UpdateResult> {
        return await this.globalUsersRepository.update(question.id, question);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.globalUsersRepository.delete(id);
    }

}

