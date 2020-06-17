import { Controller, Get, Post } from '@nestjs/common';
import { RankService } from './rank.service';
import Rank from 'src/db/models/rank.entity';

@Controller('rank')
export class RankController {

    constructor(private rankService: RankService) { }

    @Get()
    async getRank(){
        return this.rankService.showRank();
    }
}
