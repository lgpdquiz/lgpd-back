import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rank from 'src/db/models/rank.entity';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Rank])],
    providers: [RankService, ConfigService],
    controllers: [RankController],
    exports: [RankService]
})
export class RankModule { }
