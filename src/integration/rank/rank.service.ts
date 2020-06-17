import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Rank from 'src/db/models/rank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankService {

    private playersInRank = []
    private rank : Rank;

    constructor(
        @InjectRepository(Rank)
        private rankRepository : Repository<Rank>,
    ){}
    

    async  findAll(): Promise<Rank[]> {
        return Rank.find();
    }

    async findById(id): Promise<Rank> {
        return await this.rankRepository.findOne(id);
    }

    async create(): Promise<Rank> { 
        const rankInstance = Rank.create({
            id: 1,
            player : [],
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        this.rank = rankInstance;
        return await Rank.save(rankInstance);
    }

    async showRank(){
        if(this.rank != undefined){
            return this.rank;
        }
        
        return "Application wasnt started";
    }
}
